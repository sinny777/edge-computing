const PiCamera = require('pi-camera');
const path = require('path');


var exports = module.exports = {};

exports.captureFrame = function() {

    return new Promise((resolve, reject) => {
        try {
            imageDirPath = path.join(__dirname, process.env.DATA_DIR);
            const imgPath = path.join(imageDirPath, 'frame.jpg');
            const myCamera = new PiCamera({
                mode: 'photo',
                output: imgPath,
                width: 224,
                height: 224,
                nopreview: true,
                hflip: true,
                vflip: true
            });
          
            myCamera.snap().then((img) => {
                resolve(img);
            })
            .catch((error) => {
                return reject(error);
            });
        } catch (err) {
            console.error(err);
            return reject(err);
        }    
      });

}