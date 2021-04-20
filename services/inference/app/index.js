// import * as tf from '@tensorflow/tfjs';
// import * as tfd from '@tensorflow/tfjs-data';
// import {VideoCapture} from 'camera-capture'
// const { test_util } = require('@tensorflow/tfjs-node');
// const util = require('util');

const cron = require('node-cron');
const express = require('express');

const tf = require('@tensorflow/tfjs-node');
// import * as tfd from '@tensorflow/tfjs-data';
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

let camera;

dotenv.config();

let objectDetectionModel;
let labels;

app = express();

const readImage = path => {
  const imageBuffer = fs.readFileSync(path);
  const tfimage = tfnode.node.decodeImage(imageBuffer);
  // const processedImg =  tf.tidy(() => tfimage.expandDims(0).toFloat().div(127).sub(1));
  // const processedImg =  tf.tidy(() => tfimage.expandDims(0).toFloat());
  const processedImg =  tf.tidy(() => tfimage.expandDims(0).toFloat().div(224).sub(1));
  // processedImg = tf.convert_to_tensor(processedImg[:,:,:3])
  // processedImg = processedImg.reshape(None, 224, 224, 3);
  // img.dispose();
  return processedImg;
}

async function predict(model, imagePath){
  try{
    const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
    const processedImg = await readImage(imagePath);
    if(processedImg){
      let outputTensor = model.predict(processedImg);
      const predictedClass = await outputTensor.as1D().argMax().data();
      const confidence = Math.round(await outputTensor.as1D().max().data() * 100, 2);           
      return {'image': imageName, 'class': labels[predictedClass[0]], 'confidence': confidence};      
    }    
  }catch(err){
      console.error('Error to predict: >> ', imagePath, ': >>> ', err);
  }
  
}

async function predictCamImg(model){
  // console.log(tf.getBackend());
  const interval = setInterval(async function() {
    let image;
    if(!camera){
      console.log('Loading Camera...');
      if(os.platform == 'darwin'){
        camera = require('./webcam.js');
      }else{
        camera = require('./picam.js');
      }
    }

    image = await camera.captureFrame();
    
    if(image){
      result = await predict(model, image);
      console.log(result);
    }
  }, 1000); 
//  clearInterval(interval); // thanks @Luca D'Amico  
}

async function testPrediction(model){
  // console.log(tf.getBackend());
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
        result = await predict(model, filePath);
        console.log('result: >> ', result);
        if(result.class == labels[0]){
          countClass0 = countClass0 + 1;
        }else{
          countClass1 = countClass1 + 1;
        }
        total = total + 1;      
    }else{
      console.log(file);
    } 
  }
  console.log('\n\n',labels[0], countClass0,'  ', labels[1], countClass1, '  Total: ', total, '\n\n');        
}

async function test(){
  console.log(os.type()); 
  console.log(os.release()); 
  console.log(os.platform()); 
}

async function init() {
  try {
    labels = process.env.LABELS.split(',');
    const MODEL_PATH = process.env.MODEL_PATH;
    if (!objectDetectionModel) {
       objectDetectionModel = await tf.node.loadSavedModel(MODEL_PATH, ['serve'], 'serving_default');
      //  objectDetectionModelInfo = await tf.node.getMetaGraphsFromSavedModel(path);
    }
    // await testPrediction(objectDetectionModel);
    await predictCamImg(objectDetectionModel);   
  } catch (e) {
    console.log(e);    
  }
  
}

// function shutdown(retcode){
//   setTimeout(function(){
//     console.log("process kill");
//     process.exit(retcode);
//     process.kill(process.pid, -9);
//   }, 10000);
// }

// process.on('SIGTERM', function() {
//   console.log('Shutdown received.');
//   shutdown(0);
// });
// process.on('SIGINT', function() {
//   console.log('Shutdown received.');
//   shutdown(0);
// });

// Initialize the application.
init();
// test();


