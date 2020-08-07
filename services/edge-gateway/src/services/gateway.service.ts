// import { SystemInfo } from './../models/system-info.model';
import {bind, inject, BindingScope} from '@loopback/core';
import { ServiceBindings } from '../keys';
import { RadioServiceI, CommonServiceI, GatewayServiceI } from './types';
import { SystemInfo } from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService implements GatewayServiceI {
  constructor(
    @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonServiceI,
    @inject(ServiceBindings.RADIO_SERVICE) private radioService: RadioServiceI,
  ) {}

  
  async initGateway(): Promise<void>{
    console.log(' IN GatewayService.onStart: >>>>>> ');
    await this.radioService.initRadio();
  }

  async getSystemInformation(valueObject: any): Promise<SystemInfo>{   
    let systemInfo = await this.commonService.getSystemInformation(valueObject);
    if(!systemInfo.other){
      systemInfo.other = {};
    }
    systemInfo.other.radioAvailable = this.radioService.isAvailable();
    delete systemInfo.internet;
    return systemInfo;
  }


}
