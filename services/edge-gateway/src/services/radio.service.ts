import {bind, inject, BindingScope} from '@loopback/core';
// import * as RADIO from 'sx127x';
let RADIO: any;

@bind({scope: BindingScope.TRANSIENT})
export class RadioService {

    radio: any;
    FREQUENCY: string = '433e6';

    constructor() {
        if(process.platform != 'darwin'){
            RADIO = require('sx127x');
        }
    }

  async initRadio(){    
    try{
        if(this.radio || !RADIO){
            return false;
        }
        this.radio = new RADIO({
              frequency: this.FREQUENCY
            });
            let that = this;
            this.radio.open(function(err: any) {
              console.log('Radio Open: ', err ? err : 'success');
              if (err) {
                  console.log(err);
              }
              that.radio.on('data', function(data: any, rssi: any) {
//				    console.log('data:', '\'' + data.toString() + '\'', rssi);
                console.log('\n\nRadio data received: ' + data.toString());
                  
              });

              // enable receive mode
              that.radio.receive(function(err: any) {
                console.log('LORA In Receive Mode ', err ? err : 'success');
              });
            });

            process.on('SIGINT', function() {
              // close the device
              that.radio.close(function(err: any) {
                console.log('close', err ? err : 'success');
                process.exit();
              });
            });

        }catch(err){
            console.log("Error in initRadion: >>>>>>> ");
            console.log(err);
        }
  }


}
