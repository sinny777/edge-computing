
var nodemailer = require('nodemailer');

class Notification {

    transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
    constructor() {
        // this.loadModel();
    }

    sendEmail = async function(prediction) {
        try {

            const imagePath = prediction.imagePath;
            const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
            const html = '<h1>'+prediction.class+' event detected with ' +prediction.confidence+'% confidence.</h1>'

            const mailOptions = {
                from: 'elonmusk@tesla.com',
                to: 'sinny777@gmail.com',
                subject: 'Alert Notification',
                html: html,
                attachments: [
                    { // Use a URL as an attachment
                      filename: imageName,
                      path: imagePath
                  }
                ]
            };

            this.transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        } catch (e) {
          console.log(e);    
        }
    }

}

module.exports = Notification;
