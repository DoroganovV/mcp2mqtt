export const config = {
  mqtt: {
    host: '192.168.50.31',
    port: 8883,
    user: '',
    password: ''
  },

  devices: [ {
    id: 'd218bdad-7817-4395-836c-36e3b814eba9',
    name: 'Климат',
    room: 'Кабинет',
    type: 'devices.types.sensor',
    mqtt: [ {
      instances: ['co2_level', 'humidity', 'temperature', 'tvoc', 'pm2.5_density', 'pm10_density', 'pm1_density'],
      state: 'zgw2C80/0x00124B00256616EF',
      sensor: true
    }],
    valueMapping: [ 
      { type: "co2_level", subtopic: 'co2' },
      { type: "pm2.5_density", subtopic: 'pm25' },
      { type: "temperature", subtopic: 'temperature' },
      { type: "humidity", subtopic: 'humidity' },
      { type: "tvoc", subtopic: 'voc_index' },
      { type: "pm10_density", subtopic: 'pm10' },
      { type: "pm1_density", subtopic: 'pm1' },
    ],
    capabilities: [ ],
      properties: [ {
        type: 'devices.properties.float',
        state: { instance: 'co2_level', value: 0 },
        parameters: { instance: 'co2_level', unit: 'unit.ppm' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm2.5_density', value: 0 },
        parameters: { instance: 'pm2.5_density', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'temperature', value: 0 },
        parameters: { instance: 'temperature', unit: 'unit.temperature.celsius' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'humidity', value: 0 },
        parameters: { instance: 'humidity', unit: 'unit.percent' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'tvoc', value: 0 },
        parameters: { instance: 'tvoc', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm10_density', value: 0 },
        parameters: { instance: 'pm10_density', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm1_density', value: 0 },
        parameters: { instance: 'pm1_density', unit: 'unit.density.mcg_m3' }
      }],
    device_info: { manufacturer: 'IKEA KIT', model: 'VINDRIKTNING' }
  }, {
    id: '8e6702eb-1bc0-44c8-9b1e-8db36f119cfc',
      name: 'Климат',
      room: 'Спальня',
      type: 'devices.types.sensor',
      mqtt: [ {
        instances: ['co2_level', 'humidity', 'temperature', 'tvoc', 'pm2.5_density', 'pm10_density', 'pm1_density'],
        state: 'zgw2C80/0x00124B002882AA0E',
        sensor: true
      }],
      valueMapping: [ 
        { type: "co2_level", subtopic: 'co2' },
        { type: "pm2.5_density", subtopic: 'pm25' },
        { type: "temperature", subtopic: 'temperature' },
        { type: "humidity", subtopic: 'humidity' },
        { type: "tvoc", subtopic: 'voc_index' },
        { type: "pm10_density", subtopic: 'pm10' },
        { type: "pm1_density", subtopic: 'pm1' },
      ],
      capabilities: [ ],
      properties: [ {
        type: 'devices.properties.float',
        state: { instance: 'co2_level', value: 0 },
        parameters: { instance: 'co2_level', unit: 'unit.ppm' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm2.5_density', value: 0 },
        parameters: { instance: 'pm2.5_density', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'temperature', value: 0 },
        parameters: { instance: 'temperature', unit: 'unit.temperature.celsius' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'humidity', value: 0 },
        parameters: { instance: 'humidity', unit: 'unit.percent' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'tvoc', value: 0 },
        parameters: { instance: 'tvoc', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm10_density', value: 0 },
        parameters: { instance: 'pm10_density', unit: 'unit.density.mcg_m3' }
      }, {
        type: 'devices.properties.float',
        state: { instance: 'pm1_density', value: 0 },
        parameters: { instance: 'pm1_density', unit: 'unit.density.mcg_m3' }
      }],
      device_info: { manufacturer: 'IKEA KIT', model: 'VINDRIKTNING' }
    },
  ]
};