const axios = require('axios').default;

function getSafe(fn, defaultVal) {
    try { return fn() }
    catch (e) { return defaultVal }
}
const enrichEmail = (email) => {
    return axios.get('https://li.plivo.sh/v2/person/?email=' + email, {
        headers: {
            'Authorization': 'Basic bWFya2V0aW5nb3BzOm1vZG93bER0Snp4MzE='
        }
    });
}

const constructPardotData = (resp) => {
    var industry = getSafe(() => resp.company.category.industries);
    industry = Array.isArray(industry) ? industry.join(',') : null;
    
    return {
    'company_name': getSafe(() => resp.company.friendly_name),
    'default_company_name': getSafe(() => resp.company.friendly_name),
    'enriched_primary_industry': getSafe(() => resp.company.category.primary_industry),
    'company_description': getSafe(() => resp.company.description),
    'company_risk_profile': getSafe(() => resp.company.risk_profile),
    'email_deliverability': getSafe(() => resp.company.email_provider.score),
    'company_type': getSafe(() => resp.company.type),
    'enriched_segment': getSafe(() => resp.company.segment, null),
    'employee_count': getSafe(() => resp.company.metrics.employee_count),
    'enriched_city': getSafe(() => resp.company.location.city),
    'enriched_state': getSafe(() => resp.company.location.state),
    'enriched_country': getSafe(() => resp.company.location.country),
    'enriched_annual_revenue': getSafe(() => resp.company.metrics.est_revenue),
    'enriched_sector': getSafe(() => resp.company.category.sectors),
    'enriched_industry': industry,
    'enriched_facebook_url': getSafe(() => resp.company.social.facebook_url),
    'enriched_linkedin_url': getSafe(() => resp.company.social.linkedin_url),
    'enriched_twitter_url': getSafe(() => resp.company.social.twitter_url),
    'person_twitter_url': getSafe(() => resp.person.twitter_url),
    'person_facebook_url': getSafe(() => resp.person.facebook_url),
    'person_linkedin_url': getSafe(() => resp.person.linkedin_url),
    'enriched_email_type': getSafe(() => resp.person.domain_type, null),
}
}


exports.enrichEmail = enrichEmail;
exports.constructPardotData = constructPardotData;