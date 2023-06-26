/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { adobeConfig } = require('../../config/adobe')

async function getSpToken() {
    try {
        const response = await fetch(
            `https://ims-na1.adobelogin.com/ims/token/v2?grant_type=client_credentials&client_id=${adobeConfig.clientId}&client_secret=${adobeConfig.clientSecret}&org_id=${adobeConfig.orgId}&scope=openid%2CAdobeID`,
            {
                headers: {
                    "access_token": "<access-token>", //DISE-8925
                    "token_type": "bearer",
                    "expires_in": 3599
                },
            }
        )
        logMsg(null, response, 'getSpToken')
        return {
            response: response
        }
    } catch(e) {
        return {
            response: null
        }
    }
}

module.exports = {
    getSpToken
}