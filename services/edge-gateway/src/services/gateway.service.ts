import {bind, inject, BindingScope} from '@loopback/core';
import { ServiceBindings } from '../keys';
import { CommonService } from '.';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(
    @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonService,
  ) {}

  
  async onStart(){
    console.log(' IN GatewayService.onStart: >>>>>> ');
  }

  async getSystemInformation(valueObject: any){    
    return await this.commonService.getSystemInformation(valueObject);
  }


}
