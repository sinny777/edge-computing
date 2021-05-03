const { StillCamera, Flip, Rotation } = require("pi-camera-connect");
const stillCamera = new StillCamera({
    width: 224,
    height: 224,
    flip: Flip.Both,
    rotation: Rotation.Rotate0    
});

const path = require('path');
const fs = require('fs');

var exports = module.exports = {};

exports.captureFrame = function() {

    return new Promise((resolve, reject) => {
        try {
            // imagePath = path.join(__dirname, process.env.DATA_DIR);
            const imgPath = path.join(process.env.DATA_DIR, 'frames', 'frame.jpg');
            stillCamera.takeImage().then(image => {
                fs.writeFileSync(imagePath, image);
                resolve(imagePath);
            });
        } catch (err) {
            console.error(err);
            return reject(err);
        }    
      });

}

exports.getFrameBuffer = async function() {

    return await stillCamera.takeImage();

}