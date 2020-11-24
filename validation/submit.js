const axios = require('axios').default;
const qs = require('qs');
const api = require('../helpers/api');
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async function (event, context) {
    const parsedData = qs.parse(event.body);
    const formData = qs.parse(parsedData.formData);
    const url = parsedData.pardotUrl;
    if (url && formData.company_email) {
        const enrichedEmailData = (await api.enrichEmail(formData.company_email)).data;
        const dataToSendAlong = api.constructPardotData(enrichedEmailData);

        const res = await axios({
            method: 'post',
            url: url,
            data: qs.stringify({ ...formData, ...dataToSendAlong }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    }

    const payload = {
        statusCode: 200,
        body: JSON.stringify({status: 'Success'}),
        headers
    };
    return payload;
}