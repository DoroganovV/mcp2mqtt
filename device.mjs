const { logger } = global;
/* Device class defenition */
export class Device {
  constructor(options) {
    this.data = {
      id: options.id,
      name: options.name || 'Без названия',
      description: options.description || '',
      room: options.room || '',
      type: options.type || 'devices.types.light',
      custom_data: { mqtt: options.mqtt || [] },
      capabilities: (options.capabilities || []).map(c => Object.assign({}, c, { state: (c.state == undefined) ? this.initState(c) : c.state })),
      properties: (options.properties || []).map(p => Object.assign({}, p, { state: (p.state == undefined) ? this.initState(p) : p.state })),
    };
    /*this.meta = {
      allowedUsers: options.allowedUsers || ['1'],
    };*/
  }

  /*  Create init state (for capabilities and properties) on device object create */
  initState(cp) {
    const { type, parameters } = cp;
    switch (type) {
      case 'float': {
        return {
          instance: parameters.instance,
          value: 0
        }
      }
      case 'on_off': {
        return {
          instance: 'on',
          value: false
        }
      }
      case 'mode': {
        return {
          instance: parameters.instance,
          value: parameters.modes[0].value
        }
      }
      case 'event': {
        //console.log('initstate:',  parameters.events[0].value)
        return {
          instance: parameters.instance,
          value: parameters.events[0].value
        }
      }
      case 'range': {
        return {
          instance: parameters.instance,
          value: parameters.range.min
        }
      }
      case 'toggle': {
        return {
          instance: parameters.instance,
          value: false
        }
      }
      default: {
        logger.log('error', { message: `Unsupported capability type: ${type}` });
        return undefined;
      }
    }
  }

  /* Find capability by type (and instance) */
  findCapability(type, instance) {
    const { capabilities } = this.data;
    if (instance != undefined) {
      return capabilities.find(c => c.type === type && c.state.instance === instance);
    } else {
      return capabilities.find(c => c.type === type);
    }
  }

  /* Find property by type (and instance) */
  findProperty(type, instance) {
    const { properties } = this.data;
    if (instance != undefined) {
      return properties.find(p => p.type === type && p.state.instance === instance);
    } else {
      return properties.find(p => p.type === type);
    }
  }

  /* Find 'set' topic by instance*/
  findTopicByInstance(instance) {
    return this.data.custom_data.mqtt.find(i => i.instance === instance).set;
  }

  getInfo() {
    const { id, name, description, room, type, capabilities, properties } = this.data;
    return { id, name, description, room, type, capabilities, properties };
  }

  getMcpInfo() {
    const { id, name, room, capabilities, properties, type } = this.data;
    let message = `Device ID: ${id}\nName: ${name}\nRoom: ${room}\nType: ${type}\n`;
    if (properties.length > 0) {
      const prop = properties.map(p => `${p.state.instance}: ${p.state.value} ${p.parameters?.unit ?? ""}`).join('\n');
      message += `Properties:\n${prop}\n`;
    }
    if (capabilities.length > 0) {
      let cap = "";
      for (const c of capabilities) {
        cap += `${c.state.instance}: ${c.state.value} ${c.parameters?.unit ?? ""}`;
        if (c.parameters?.acceptableValues) {
          cap += ` (acceptable values: ${c.parameters.acceptableValues.map(v => `${v.id} ${v.discription ?? ""}`).join(', ')})`;
        }
        cap += '\n';
      }
      message += `Capabilities:\n${cap}\n`;
    }
    return message;
  }

  /* Change device capability state and publish value to MQTT topic */
  setCapabilityState(value, type, instance) {
    const { id } = this.data;
    let message;
    let topic;
    try {
      const capability = this.findCapability(type, instance);
      if (capability == undefined) throw new Error(`Can't find capability '${type}' in device '${id}'`);
      capability.state.value = value;
      topic = this.findTopicByInstance(instance);
      if (topic == undefined) throw new Error(`Can't find set topic for '${type}' in device '${id}'`);
      message = `${value}`;
    } catch (e) {
      topic = false;
      console.log('error message:', `${e}`);
      return "Error: " + e.message;
    }

    if (topic) {
      global.mqttClient.publish(topic, message);
    }

    return "DONE";
  }

  /* Update device capability or property state */
  updateState(value, instance) {
    const { id, capabilities, properties } = this.data;

    try {
      const cp = [].concat(capabilities, properties).find(cp => (cp.state.instance === instance));
      if (cp == undefined) throw new Error(`Can't instance '${instance}' in device '${id}'`);

      const newValue = this.normalizeValue(value, cp.type);
      if (cp.state.value != newValue) {
        cp.state = { instance, value: newValue };
        return true;
      }
      return false;
    } catch (e) {
      console.log('error updateState:', `${e}`);
      return false;
    }
  }

  /* function for convert system values to Yandex (depends of capability or property type) */
  normalizeValue(val, actType) {
    switch (actType) {
      case 'range':
      case 'float': {
        if (val == undefined) return 0.0;
        try {
          const value = parseFloat(val);
          return isNaN(value) ? 0.0 : value;
        } catch (e) {
          logger.log('error', { message: `Can't parse to float: ${val}` });
          return 0.0;
        }
      }
      case 'toggle':
      case 'on_off': {
        if (val == undefined) return false;
        return (['true', 'on', '1'].indexOf(String(val).toLowerCase()) != -1);
      }
      default:
        return val;
    }
  }
}

export function getAllDevices() {
  try {
    const results = [];
    for (const d of global.devices) {
      //console.log('Info device:', JSON.stringify(d.getMcpInfo()));
      results.push(d.getMcpInfo());
    };
    return results;
  } catch (e) {
    console.log('error', { message: `${e}` });
    return [{ type: "text", text: `Exception ${e}` }];
  }
}

export function getDevice(deviceId) {
  try {
    const foundDevice = global.devices.find(x => x.data.id == deviceId);
    if (!foundDevice)
      return `Device not found`;

    //console.log('Info device:', JSON.stringify(d.getMcpInfo()));
    return foundDevice.getMcpInfo();
  } catch (e) {
    console.log('error', { message: `${e}` });
    return `Exception ${e}`;
  }
}

export function setDeviceValue(deviceId, instance, value) {
  try {
    const foundDevice = global.devices.find(x => x.data.id == deviceId);
    if (!foundDevice)
      return `Device not found`;

    const capability = foundDevice.data.capabilities.find(p => p.state.instance == instance);
    if (!capability)
      return `Capability not found`;

    if (capability.parameters?.acceptableValues && capability.parameters.acceptableValues.filter(v => v.id == value).length == 0)
        return `Value '${value}' not in acceptable values: ${capability.parameters.acceptableValues.map(v => v.id).join(', ')}`;

    return foundDevice.setCapabilityState(value, capability.type, instance);
  } catch (e) {
    console.log('error', { message: `${e}` });
    return `Exception ${e}`;
  }
}