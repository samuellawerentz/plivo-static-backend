const axios = require('axios').default;
const qs = require('qs');
const api = require('../helpers/api');

// Specify headers to avoid CORS
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async function (event, context) {
    const parsedData = qs.parse(event.body);
    const formData = qs.parse(parsedData.formData);
    // Get the pardot Form handler URL
    const url = parsedData.pardotUrl;
    let status = false
    if (url && formData.company_email) {
        // Enrich email and get data
        const enrichedEmailData = (await api.enrichEmail(formData.company_email)).data;

        // Construct enriched data that needs to be sent to pardot
        const dataToSendAlong = api.constructPardotData(enrichedEmailData);
        status = (enrichedEmailData.person.domain_type === 'personal' && !enrichedEmailData.person.enrich) ? false : (enrichedEmailData.person.domain_type && !['disposable', 'malicious', 'blacklisted'].includes(enrichedEmailData.person.domain_type));

        // Send Data to Pardot via Form Handler if it is a valid email
        // Commented out for now so that we don't spam Pardot
        if(status){
            // await axios({
            //     method: 'post',
            //     url: url,
            //     data: qs.stringify({ ...formData, ...dataToSendAlong }),
            //     headers: {
            //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            //     }
            // })
        }
    }

    // Success = true, if all things are good and the data is submitted to pardot.
    // Success = false, if invalid email is provided or if there is some error in submission
    const payload = {
        statusCode: 200,
        body: JSON.stringify({success: status}),
        headers
    };
    return payload;
}