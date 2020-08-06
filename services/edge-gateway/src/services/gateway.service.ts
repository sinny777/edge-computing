import { SystemInfo } from './../models/system-info.model';
import {bind, inject, BindingScope} from '@loopback/core';
import { ServiceBindings } from '../keys';
import { CommonService, RadioService } from '.';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(
    @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonService,
    @inject(ServiceBindings.RADIO_SERVICE) private radioService: RadioService,
  ) {}

  
  async onStart(){
    console.log(' IN GatewayService.onStart: >>>>>> ');
    await this.radioService.initRadio();
  }

  async getSystemInformation(valueObject: any){   
    let systemInfo = await this.commonService.getSystemInformation(valueObject);
    if(systemInfo && systemInfo.internet) {
      systemInfo.internetAwailable = systemInfo.internet.ok;
    }
    systemInfo.radioAvailable = this.radioService.isAvailable;
    delete systemInfo.internet;
    return systemInfo;
  }


}
