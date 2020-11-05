// Simple Contact Form Spam Filter
const https = require('https')

exports.handler = async function(event, context, callback) {
    https.get('https://www.google.com/', (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
      
        res.on('data', (d) => {
          return {data: d};
        });
      
      }).on('error', (e) => {
        console.error(e);
        return e;
      });
  }