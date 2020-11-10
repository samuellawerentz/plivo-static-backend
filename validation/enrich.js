// Simple Contact Form Spam Filter
const axios = require('axios').default;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET'
  };
exports.handler = async function(event, context) {
    const email = event.queryStringParameters.email
    const res = await axios.get('https://li.plivo.sh/v2/person/?email=' + email, {
        headers: {
            'Authorization': 'Basic bWFya2V0aW5nb3BzOm1vZG93bER0Snp4MzE='
          }
    });
    const isAuthentic = (res.data.person.domain_type === 'personal' && !res.data.person.enrich) ? false : (res.data.person.domain_type && !['disposable', 'malicious', 'blacklisted'].includes(res.data.person.domain_type));
    const payload = {
        statusCode: 200,
        body: JSON.stringify({isAuthentic, ...res.data}),
        headers
    };
    return payload;
  }