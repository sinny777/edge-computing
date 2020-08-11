import { ServiceBindings } from '../keys';
import { RuleServiceI, CommonServiceI } from './types';
import {bind, inject, BindingScope} from '@loopback/core';
import { Engine, Rule } from 'json-rules-engine'

@bind({scope: BindingScope.TRANSIENT})
export class RuleService implements RuleServiceI {

    engine: Engine;

    constructor(
        @inject(ServiceBindings.COMMON_SERVICE) private commonService: CommonServiceI        
    ) {
        this.engine = new Engine();
     }

    async addRules(rules: Array<Rule>) {
        for(let rule of rules){
            this.engine.addRule(rule);
        }        
    }

    async processRules(data: any): Promise<void> {    
        try{
                if(this.validate(data)) {
                    if(data && data.d){
                        this.engine
                        .run(data)
                        .then(results => {
                            results.events.map(event => {
                                if(event && event.params){
                                    delete data['success-events'];
                                    console.log("Rule Triggered for data: ", data, ", Event: ", event, "\n\n");                                    
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

    private validate(data: any){
        return true;
    }

}
