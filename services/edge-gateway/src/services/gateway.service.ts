import {bind, inject, BindingScope} from '@loopback/core';
import * as si from 'systeminformation';
import * as os from 'os';
import * as fs from 'fs';

@bind({scope: BindingScope.TRANSIENT})
export class GatewayService {
  constructor(
    
  ) {}

  
  async onStart(){
    console.log(' IN GatewayService.onStart: >>>>>> ');
  }

  async getSystemInformation(valueObject: any){    
    let systemInfo = await si.get(valueObject);
    systemInfo.internet = await si.inetChecksite('google.com');

    // let systemInfo: any  = {};
    systemInfo.totalmem = os.totalmem() / (1024 * 1024);
    systemInfo.freemem = os.freemem() / (1024 * 1024);
    // systemInfo.cpus = os.cpus();
    systemInfo.uptime = os.uptime() / 60;
    systemInfo.serialNumber = await this.getSerialNumber();
    return systemInfo;
  }

  async getSerialNumber() {
		try{
			  let content = fs.readFileSync('/proc/cpuinfo', 'utf8');
		    let cont_array = content.split("\n");
		    let serial_line = cont_array[cont_array.length-3];
		    let serial = serial_line.split(":");
		    return serial[1].slice(1);
//		    return "GG-000-000-001";
		}catch(err){
			console.log("process.platform: >>> ", process.platform);
			if(process.platform == 'darwin'){
				return "000000008c0be72b";
			}else{
				return null;
			}
    }
  }

}
