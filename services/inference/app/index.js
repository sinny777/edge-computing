// import * as tf from '@tensorflow/tfjs';
// import * as tfd from '@tensorflow/tfjs-data';
// import {VideoCapture} from 'camera-capture'
// const { test_util } = require('@tensorflow/tfjs-node');
// const util = require('util');

const express = require('express');
const dotenv = require('dotenv');
Classify = require('./handlers/classify.js');

dotenv.config();

async function init() {
  try {
    const classify = new Classify();
    await classify.loadModel();
    await classify.startDetection();   
  } catch (e) {
    console.log(e);    
  }  
}

app = express();

init();

// test();
app.listen(3000);


