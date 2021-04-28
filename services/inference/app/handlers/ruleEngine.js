
const Notification = require('./notification.js'); 

class RuleEngine {

    predictionCount = 0;
    alertConfig = {
        label: 'Fire',
        frequency: 3
    }; 
      
    constructor() {
        this.notification = new Notification(); 
    }

    processEdgeRules = async function(result) {
        try {
            console.log(result);
            if(result.class == this.alertConfig.label){    
                this.predictionCount = this.predictionCount + 1;
                if(this.predictionCount > this.alertConfig.frequency){
                    console.log('\n\nSEND ALERT FOR ', result.class, '\n\n');
                    this.notification.sendEmail(result)
                    this.predictionCount = 0;
                } 
            }else{
                this.predictionCount = 0;
            } 
        } catch (err) {
            console.error(err);
            return reject(err);
        } 
    }

}

module.exports = RuleEngine;
