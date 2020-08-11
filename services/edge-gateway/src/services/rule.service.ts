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

    async processRules(data: any): Promise<void> {    
        try{
                if(this.validate(data)) {
                    console.log('IN Process Rules for : >> ', data);
                    this.engine
                    .run(data)
                    .then(results => {
                        // 'results' is an object containing successful events, and an instance containing facts
                        results.events.map(event => {
                            if(event && event.params){
                                console.log(event);
                            }                            
                        });
                    }).catch(err => console.log(err.stack));
                }
            } catch(err){
                console.log("Error in processRules: >>>>>>> ");
                console.log(err);
            }
    }

    validate(data: any){
        return true;
    }

   async addRules(rules: Array<Rule>) {
       for(let rule of rules){
        this.engine.addRule(rule);
       }        
    }

}
