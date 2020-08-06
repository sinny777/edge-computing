import {bind, inject, BindingScope} from '@loopback/core';
// import * as RADIO from 'sx127x';
let RADIO: any;

@bind({scope: BindingScope.TRANSIENT})
export class RadioService {

    radio: any;
    FREQUENCY: string = '433e6';
    isAvailable: boolean = false;

    constructor() {
        if(process.platform != 'darwin'){
            RADIO = require('edge-sx127x');
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
            this.radio.open((err: any) => {
              console.log('Radio Open: ', err ? err : 'success');
              if (err) {
                  console.log(err);
                  this.isAvailable = false;
              }
              this.isAvailable = true;
              this.radio.on('data', (data: any, rssi: any) => {
//				    console.log('data:', '\'' + data.toString() + '\'', rssi);
                console.log('\n\nRadio data received: ' + data.toString());
                  
              });

              // enable receive mode
              this.radio.receive((err: any) => {
                console.log('LORA In Receive Mode ', err ? err : 'success');
              });
            });

            process.on('SIGINT', () => {
              // close the device
              this.isAvailable = false;
              this.radio.close(function(err: any) {
                console.log('close', err ? err : 'success');
                process.exit();
              });
            });

        }catch(err){
            this.isAvailable = false;
            console.log("Error in initRadion: >>>>>>> ");
            console.log(err);
        }
  }


}
