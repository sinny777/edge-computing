const NodeWebcam = require( "node-webcam" );
const path = require('path');

const webcam_opts = {
    width: 264,
    height: 264,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "buffer",
    verbose: false
  };
  
var exports = module.exports = {};

exports.getFrameBuffer = function() {

    return new Promise((resolve, reject) => {
        try {
          const Webcam = NodeWebcam.create( webcam_opts );
          const imgPath = path.join(process.env.DATA_DIR, 'frames', 'frame.jpg');        
          // const imgPath = path.join('/tmp', 'frame.jpg');
          Webcam.capture( imgPath, async function( err, imageBuffer ) {
            if(err){
              console.error(err);
              return reject(err);
            }
            resolve(imageBuffer);        
          });
        } catch (err) {
            console.error(err);
            return reject(err);
        }    
      });

}
