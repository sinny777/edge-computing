import { ServiceBindings } from '../keys';
import {bind, inject, BindingScope} from '@loopback/core';
import { SimulatorUtilityI } from '.';
import { CommonServiceI, RuleServiceI } from '../services';
import * as SCHEDULE from 'node-schedule';
import * as simulateJson from '../config/simulate.json';

@bind({scope: BindingScope.TRANSIENT})
export class SimulatorUtility implements SimulatorUtilityI {

    constructor(
        @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonServiceI,
        @inject(ServiceBindings.RULE_SERVICE) private ruleService: RuleServiceI        
    ) { }

  async simulate(config: any): Promise<void> {    
    try{

            let rules: Array<any> = simulateJson.rules;
            this.ruleService.addRules(rules);

            // const schedule = new SCHEDULE;
            let s = SCHEDULE.scheduleJob('*/5 * * * * *', () => {
                // console.log('The answer to life, the universe, and everything!');
                let data = this.createData(config);
                this.ruleService.processRules(data);
            });
          
        } catch(err){
            console.log("Error in simulate: >>>>>>> ");
            console.log(err);
        }
  }

createData(config: any): any{
    let sensor: any = {
        type: 'HB_SENSOR',
        uniqueId: 'HB_SENSOR-3C71BF4340FC',
        hum: 0.0,
        temp: 0.0,
        press: 0.0,
        alt: 0.0
    };
    sensor.hum = 40 + Math.floor(Math.random() * 20);
    sensor.temp = 30 + Math.floor(Math.random() * 10);
    sensor.press = 970 + Math.floor(Math.random() * 25);
    sensor.alt = 300 + Math.floor(Math.random() * 15);
    return sensor;
  }

}
