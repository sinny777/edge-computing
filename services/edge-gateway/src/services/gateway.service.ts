import {bind, /* inject, */ BindingScope} from '@loopback/core';
import * as si from 'systeminformation';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(/* Add @inject to inject parameters */) {}

  
  async onStart(){
    console.log(" <<<<<<<<< Gateway Started >>>>>>>>> ");
    let systemInfo = await this.systemInformation();
    console.log(systemInfo);
  }

  async systemInformation(){
    let valueObject = {
      cpu: '*',
      osInfo: 'platform, release',
      system: 'model, version, serial, uuid, sku',
      mem: 'total, free, used',
      battery: 'hasbattery, percent'
    }
    
    // si.get(valueObject).then(data => console.log(data));
    let systemInfo = await si.get(valueObject);
    systemInfo.internet = await si.inetChecksite('google.com');
    // si.inetChecksite('google.com').then(data => console.log(data));
    return systemInfo;

  }

}
