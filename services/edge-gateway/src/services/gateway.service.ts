import {bind, inject, BindingScope} from '@loopback/core';
import * as si from 'systeminformation';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(
    
  ) {}

  
  async onStart(){
    // const valueObject = {
    //   cpu: '*',
    //   osInfo: 'platform, release',
    //   system: 'model, version, serial, uuid, sku',
    //   mem: 'total, free, used',
    //   battery: 'hasbattery, percent'
    // }
    // let systemInfo = await this.getSystemInformation(valueObject);
    // console.log(systemInfo);
    console.log(' IN GatewayService.onStart: >>>>>> ');
  }

  async getSystemInformation(valueObject: any){    
    // si.get(valueObject).then(data => console.log(data));
    let systemInfo = await si.get(valueObject);
    systemInfo.internet = await si.inetChecksite('google.com');
    // si.inetChecksite('google.com').then(data => console.log(data));
    return systemInfo;
  }

}
