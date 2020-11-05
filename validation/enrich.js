// Simple Contact Form Spam Filter
const axios = require('axios').default;
exports.handler = async function(event, context) {
    const email = event.queryStringParameters.email
    const res = await axios.get('https://li.plivo.sh/v2/person/?email=' + email, {
        headers: {
            'Authorization': 'Basic bWFya2V0aW5nb3BzOm1vZG93bER0Snp4MzE='
          }
    });
    const payload = {
        statusCode: 200,
        body: JSON.stringify(res.data)
    };
    return payload;
  }