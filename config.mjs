export const config = {
  mqtt: {
    host: '192.168.50.31',
    port: 8883,
    user: '',
    password: ''
  },

  devices: [
    {
      id: 'd218bdad-7817-4395-836c-36e3b814eba9',
      name: 'Климат',
      room: 'Кабинет',
      type: 'sensor',
      mqtt: [
        {
          instance: 'co2_level',
          state: 'zgw2C80/0x00124B00256616EF/co2'
        },
        {
          instance: 'pm2.5_density',
          state: 'zgw2C80/0x00124B00256616EF/pm25'
        },
        {
          instance: 'temperature',
          state: 'zgw2C80/0x00124B00256616EF/temperature'
        },
        {
          instance: 'humidity',
          state: 'zgw2C80/0x00124B00256616EF/humidity'
        },
        {
          instance: 'tvoc',
          state: 'zgw2C80/0x00124B00256616EF/voc_index'
        },
        {
          instance: 'pm10_density',
          state: 'zgw2C80/0x00124B00256616EF/pm10'
        },
        {
          instance: 'pm1_density',
          state: 'zgw2C80/0x00124B00256616EF/pm1'
        }
      ],
      capabilities: [],
      properties: [
        {
          type: 'float',
          state: { instance: 'co2_level', value: 0 },
          parameters: { instance: 'co2_level', unit: 'ppm' }
        },
        {
          type: 'float',
          state: { instance: 'pm2.5_density', value: 0 },
          parameters: { instance: 'pm2.5_density', unit: 'µg/m³' }
        },
        {
          type: 'float',
          state: { instance: 'temperature', value: 0 },
          parameters: { instance: 'temperature', unit: '℃' }
        },
        {
          type: 'float',
          state: { instance: 'humidity', value: 0 },
          parameters: { instance: 'humidity', unit: '%' }
        },
        {
          type: 'float',
          state: { instance: 'tvoc', value: 0 },
          parameters: { instance: 'tvoc', unit: 'µg/m³' }
        },
        {
          type: 'float',
          state: { instance: 'pm10_density', value: 0 },
          parameters: { instance: 'pm10_density', unit: 'µg/m³' }
        },
        {
          type: 'float',
          state: { instance: 'pm1_density', value: 0 },
          parameters: { instance: 'pm1_density', unit: 'µg/m³' }
        }
      ],
      device_info: { manufacturer: 'IKEA KIT', model: 'VINDRIKTNING' }
    },
    {
      id: '8e6702eb-1bc0-44c8-9b1e-8db36f119cfc',
      name: 'Климат',
      room: 'Спальня',
      type: 'sensor',
      mqtt: [
        {
          instance: 'co2_level',
          state: 'zgw2C80/0x00124B002882AA0E/co2'
        },
        {
          instance: 'pm2.5_density',
          state: 'zgw2C80/0x00124B002882AA0E/pm25'
        },
        {
          instance: 'temperature',
          state: 'zgw2C80/0x00124B002882AA0E/temperature'
        },
        {
          instance: 'humidity',
          state: 'zgw2C80/0x00124B002882AA0E/humidity'
        },
        {
          instance: 'tvoc',
          state: 'zgw2C80/0x00124B002882AA0E/voc_index'
        },
        {
          instance: 'pm10_density',
          state: 'zgw2C80/0x00124B002882AA0E/pm10'
        },
        {
          instance: 'pm1_density',
          state: 'zgw2C80/0x00124B002882AA0E/pm1'
        }
      ],
      capabilities: [],
      properties: [
        {
          type: 'float',
          state: { instance: 'co2_level', value: 0 },
          parameters: { instance: 'co2_level', unit: 'ppm' }
        }, {
          type: 'float',
          state: { instance: 'pm2.5_density', value: 0 },
          parameters: { instance: 'pm2.5_density', unit: 'µg/m³' }
        }, {
          type: 'float',
          state: { instance: 'temperature', value: 0 },
          parameters: { instance: 'temperature', unit: '℃' }
        }, {
          type: 'float',
          state: { instance: 'humidity', value: 0 },
          parameters: { instance: 'humidity', unit: '%' }
        }, {
          type: 'float',
          state: { instance: 'tvoc', value: 0 },
          parameters: { instance: 'tvoc', unit: 'µg/m³' }
        }, {
          type: 'float',
          state: { instance: 'pm10_density', value: 0 },
          parameters: { instance: 'pm10_density', unit: 'µg/m³' }
        }, {
          type: 'float',
          state: { instance: 'pm1_density', value: 0 },
          parameters: { instance: 'pm1_density', unit: 'µg/m³' }
        }
      ],
      device_info: { manufacturer: 'IKEA KIT', model: 'VINDRIKTNING' }
    },
    {
      id: '7cd0b96e-f574-4b2b-9868-af67aa354dd1',
      name: 'Лампа',
      room: 'Кабинет',
      type: 'light',
      allowedUsers: ['1', '2'],
      mqtt: [
        {
          instance: 'state',
          state: 'zgw2C80/0x70AC08FFFEE28CAF/state',
          set: 'zgw2C80/0x70AC08FFFEE28CAF/set/state'
        },
        {
          instance: 'brightness',
          state: 'zgw2C80/0x70AC08FFFEE28CAF/brightness',
          set: 'zgw2C80/0x70AC08FFFEE28CAF/set/brightness'
        },
        {
          instance: 'temperature_k',
          state: 'zgw2C80/0x70AC08FFFEE28CAF/color_temp',
          set: 'zgw2C80/0x70AC08FFFEE28CAF/set/color_temp'
        }
      ],
      capabilities: [
        {
          type: 'ON_OFF',
          state: { instance: 'state', value: 'ON' },
          parameters: {
            acceptableValues: [
              { id: 'ON' },
              { id: 'OFF' }
            ]
          }
        },
        {
          type: 'float',
          state: { instance: 'brightness', value: 50 },
          parameters: {
            instance: 'brightness',
            acceptableValues: [
              { id: '50', discription: 'Minimum' },
              { id: '100', discription: 'Dim' },
              { id: '150', discription: 'Normal' },
              { id: '200', discription: 'Bright' },
              { id: '250', discription: 'Maximum' },
            ]
          }
        },
        {
          type: 'color_setting',
          state: { instance: 'temperature_k', value: 300 },
          parameters: {
            instance: 'temperature_k',
            acceptableValues: [
              { id: '500', discription: '3400K Warm White' },
              { id: '300', discription: '4500K White' },
              { id: '100', discription: '6500K Cool White' },
            ]
          }
        }
      ],
      properties: [],
      device_info: {
        manufacturer: 'ikea',
        model: 'TRÅDFRI'
      }
    },

    {
      id: 'f74512a9-1af3-4ac2-a801-940a8f1a34df',
      name: 'Гирлянда',
      room: 'Гостиная',
      type: 'light.strip',
      allowedUsers: ['1', '2'],
      mqtt: [
        {
          instance: 'state',
          state: 'zgw2C80/0xA4C138454A843B46/state',
          set: 'zgw2C80/0xA4C138454A843B46/set/state'
        },
        {
          instance: 'voltage',
          state: 'zgw2C80/0xA4C138454A843B46/voltage',
        },
        {
          instance: 'amperage',
          state: 'zgw2C80/0xA4C138454A843B46/current',
        },
        {
          instance: 'power',
          state: 'zgw2C80/0xA4C138454A843B46/power',
        }
      ],
      capabilities: [
        {
          type: 'ON_OFF',
          state: { instance: 'state', value: 'ON' },
          acceptableValues: [
            { id: 'ON' },
            { id: 'OFF' }
          ]
        }
      ],
      properties: [
        {
          type: 'float',
          state: { instance: 'voltage', value: 0 },
          parameters: { instance: 'voltage', unit: 'volt' }
        },
        {
          type: 'float',
          state: { instance: 'amperage', value: 0 },
          parameters: { instance: 'amperage', unit: 'ampere' }
        },
        {
          type: 'float',
          state: { instance: 'power', value: 0 },
          parameters: { instance: 'power', unit: 'watt' }
        }
      ],
      device_info: {
        manufacturer: 'Tuya',
        model: 'TS011F'
      }
    }
  ]
};