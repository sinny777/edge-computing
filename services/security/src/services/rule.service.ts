import { ServiceBindings } from '../keys';
import { RuleServiceI, CommonServiceI } from './types';
import {bind, inject, BindingScope} from '@loopback/core';
import { Engine, Rule } from 'json-rules-engine'

@bind({scope: BindingScope.APPLICATION})
export class RuleService implements RuleServiceI {

    private engine: Engine;

    constructor(
        @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonServiceI
    ) {
        this.engine = new Engine();
     }

    async addRules(rules: Array<Rule>) {
        if(rules){
            for(let rule of rules){
                this.engine.addRule(rule);                
            } 
        }               
    }

    async processRules(data: any): Promise<void> {    
        try{
                const facts: any = await this.transformNvalidate(data);
                if(facts) {
                    if(facts && facts.output){
                        await this.engine
                        .run(facts.output)
                        .then(results => {
                            // console.log(results);
                            results.events.map(event => {
                                if(event && event.params){
                                    delete facts['output']['success-events'];
                                    // facts['success-events'] = undefined;
                                    console.log("Rule Triggered for data: ", facts.output, ", Event: ", event, "\n\n");                                    
                                }                            
                            });
                        }).catch(err => console.log(err.stack));
                    }                    
                }
            } catch(err){
                console.log("Error in processRules: >>>>>>> ");
                console.error(err);
            }
    }

    private async transformNvalidate(data: any): Promise<any>{

        let func = function transform(data: any){
            // console.log('In Transform function: >> ');
            return data;
        };
      
        var transformFuncStr = String(func);
        //   console.log(JSON.stringify(transformFuncStr));
        let transFunc: Function = new Function ('return ' +transformFuncStr)();

        return transFunc(data);
    }

}
