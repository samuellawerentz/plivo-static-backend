// Simple Contact Form Spam Filter
const axios = require('axios').default;
const api = require('../helpers/api');
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET'
  };
exports.handler = async function(event, context) {
    const email = event.queryStringParameters.email
    const res = await api.enrichEmail(email);
    const isAuthentic = (res.data.person.domain_type && !['disposable', 'malicious', 'blacklisted'].includes(res.data.person.domain_type));
    const payload = {
        statusCode: 200,
        body: JSON.stringify({isAuthentic, ...res.data}),
        headers
    };
    return payload;
  }