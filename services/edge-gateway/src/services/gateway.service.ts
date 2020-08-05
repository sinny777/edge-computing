import {bind, inject, BindingScope} from '@loopback/core';
import * as si from 'systeminformation';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(
    
  ) {}

  
  async onStart(){
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
