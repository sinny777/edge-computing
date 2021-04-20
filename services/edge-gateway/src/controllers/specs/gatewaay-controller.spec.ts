export const SystemInfoSchema = {
    type: 'object',
    properties: {
      cpu: {type: 'object'},
      osInfo: {type: 'object'},
      system: {type: 'object'},
      mem: {type: 'object'},
      battery: {type: 'object'}
    },
  };