
const express = require('express');
const dotenv = require('dotenv');
Classify = require('./handlers/classify.js');

dotenv.config();
app = express();
const classify = new Classify();

async function init() {
  try {
    await classify.loadModel();
    await classify.startDetection();    
  } catch (e) {
    console.log(e);    
  }  
}

app.get('/detect', async function (req, res) {
  await classify.startDetection();
  res.send('Detection of Events Started..');
});

app.get('/stop', async function (req, res) {
  await classify.stopDetection();
  res.send('Detection of Events Stopped..');
});

init();

// test();
app.listen(3001);
console.log('APP Listneing on port 3001');


