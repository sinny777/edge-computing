
const tf = require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs');
// import * as tfd from '@tensorflow/tfjs-data';
// const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cron = require('node-cron');
const Notification = require('./notification.js'); 


let Classify = class {

    constructor() {
        // this.loadModel();
        this.notification = new Notification();  
        this.model;
        this.labels;
        this.camera;
        this.predictionCount = 0;
        this.notification;
        this.task;
        this.detecting = false; 
        this.alertConfig = {
            label: 'Fire',
            frequency: 3
        };   
    }

    loadModel = async function() {
        try {
          this.labels = process.env.LABELS.split(',');
        //   const data_dir = path.join(__dirname, process.env.DATA_DIR);
          const MODEL_PATH = path.join(process.env.DATA_DIR, 'model');
          if (!this.model) {
             this.model = await tf.node.loadSavedModel(MODEL_PATH, ['serve'], 'serving_default');
            //  objectDetectionModelInfo = await tf.node.getMetaGraphsFromSavedModel(path);
            console.log('AI Model Loaded...');
          }
        } catch (e) {
          console.log(e);    
        }
    }

    readImage = async function(imagePath){
        console.log('In readImage, imagePath: ', imagePath);
        const imageBuffer = fs.readFileSync(imagePath);
        const tfimage = tf.node.decodeImage(imageBuffer);
        const processedImg =  tf.tidy(() => tfimage.expandDims(0).toFloat().div(224).sub(1));
        // imageBuffer.dispose();
        return processedImg;
    }

    predict =  async function(imagePath){
        try{
          const processedImg = await this.readImage(imagePath);
          if(processedImg && this.model){
            let outputTensor = this.model.predict(processedImg);
            // console.log(outputTensor);
            const predictedClass = await outputTensor.as1D().argMax().data();
            const confidence = Math.round(await outputTensor.as1D().max().data() * 100, 2);   
            const result = {'imagePath': imagePath, 'class': this.labels[predictedClass[0]], 'confidence': confidence}; 
            await this.sendAlert(result);
            return result;      
          }    
        }catch(err){
            console.error('Error to predict: >> ', imagePath, ': >>> ', err);
        }
        
    }

    sendAlert = async function(result){
        console.log(result);
        if(result.class == this.alertConfig.label){    
            this.predictionCount = this.predictionCount + 1;
            if(this.predictionCount > this.alertConfig.frequency){
                console.log('SEND ALERT FOR ', this.labels[0]);
                this.notification.sendEmail(result)
                this.predictionCount = 0;
            } 
        }else{
            this.predictionCount = 0;
        }         
    }

    predictFrame = async function (){
        // console.log(tf.getBackend());
        try{
          if(!this.camera){
            if(os.platform() == 'darwin'){
                this.camera = require('./webcam.js');                
            }else{
                this.camera = require('./picam.js');                
            }
          }
      
          const imagePath = await this.camera.captureFrame();
          // const imagePath = './assets/images/fireNSmoke1.jpeg';
          
          if(imagePath){
            const result = await this.predict(imagePath);
            console.log('RESULT: >> ', result);
            return result;
          }
        }catch(error){
          console.error(error);
        }       
    }

    startDetection = async function(){
      if(!this.detecting){
        this.task = cron.schedule('*/5 * * * * *', async () =>  {
          await this.predictFrame();
          // await testPrediction(objectDetectionModel);
          console.log('Event Detection Started...');  
          this.detecting = true;
        });
      }else{
        console.log('Event Already detecting...');
      }         
    }

    stopDetection = async function(){
       this.task.stop();
       console.log('Event Detection Stopped...');
       this.detecting = false;
    }

    testPrediction = async function (){
        // console.log(tf.getBackend());
        if(!this.model){
            console.log('NO Model Loaded for Inference....');
            return false;
        }
        countClass0 = 0;
        countClass1 = 0;
        total = 0;
        // regex = /(gif|jpg|jpeg)$/
        regex = /\.(gif|jpe?g|tiff?)$/i
        imageDirPath = path.join(__dirname, process.env.DATA_DIR);
        // console.log('imageDirPath: >> ', imageDirPath);
        files = await fs.readdirSync(imageDirPath);
        for (const file of files) {
          if(file.match(regex)){
              const filePath = path.join(imageDirPath, file);
              result = await this.predict(filePath);
              console.log('result: >> ', result);
              if(result.class == this.labels[0]){
                countClass0 = countClass0 + 1;
              }else{
                countClass1 = countClass1 + 1;
              }
              total = total + 1;      
          }else{
            console.log(file);
          } 
        }
        console.log('\n\n',this.labels[0], countClass0,'  ', this.labels[1], countClass1, '  Total: ', total, '\n\n');        
      }

}

module.exports = Classify;

