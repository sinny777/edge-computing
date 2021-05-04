
const path = require('path');
const fs = require('fs');

const Notification = require('./notification.js'); 

class RuleEngine {

    predictionCount = 0;
      
    constructor() {
        this.notification = new Notification(); 
        this.alertConfig = {
            label: process.env.ALERT_LABEL,
            frequency: process.env.ALERT_FREQUENCY,
            threshold: process.env.ALERT_THRESHOLD
        }
    }

    processEdgeRules = async function(result) {
        try {
            if(!result || !result.output){
                return false;
            }

            // console.log(result.output);
            // const imgPath = path.join('/tmp', 'frame.jpg');
            const imgPath = path.join(process.env.DATA_DIR, 'frames', 'detected.jpg');
            if(result.output.class == this.alertConfig.label && result.output.confidence >= this.alertConfig.threshold){    
                this.predictionCount = this.predictionCount + 1;
                if(this.predictionCount > this.alertConfig.frequency){
                    console.log('\n\nSEND ALERT FOR ', result.output.class, '\n\n');
                    fs.writeFileSync(imgPath, result.input.image);
                    result['output']['imagePath'] = imgPath;
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
