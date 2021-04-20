
const cron = require('node-cron');
const express = require('express');

const tf = require('@tensorflow/tfjs-node');
// import * as tfd from '@tensorflow/tfjs-data';
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

class Classify {
    objectDetectionModel;
    loadModel = async function() {
        try {
          labels = process.env.LABELS.split(',');
          const MODEL_PATH = process.env.MODEL_PATH;
          if (!objectDetectionModel) {
             objectDetectionModel = await tf.node.loadSavedModel(MODEL_PATH, ['serve'], 'serving_default');
            //  objectDetectionModelInfo = await tf.node.getMetaGraphsFromSavedModel(path);
          }
        } catch (e) {
          console.log(e);    
        }
    }

    startDetection = async function(){
        var task = cron.schedule('*/2 * * * * *', async () =>  {
            await predictCamImg(objectDetectionModel);
            // await testPrediction(objectDetectionModel);   
        });    
          // task.stop();
    }

    testPrediction = async function (model){
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
}

module.exports = Classify;
