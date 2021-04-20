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
    const systemInfo = await this.getSystemInformation({});
    if(systemInfo && systemInfo.other && systemInfo.other.internetAvailable){
      await this.syncWithCloud();
    }
    await this.radioService.initRadio();
  }
  
  async syncWithCloud(): Promise<void> {
    // throw new Error("Method not implemented.");
    console.log('FETCH GATEWAY CONFIGURATIONS: >>> ');
    console.log('FETCH CONNECTED DEVICES LIST: >>> ');
    console.log('FETCH RULES FOR SENSORS DATA: >>> ');
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
