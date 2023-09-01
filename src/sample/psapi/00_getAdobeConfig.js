// /*
// Copyright 2023 Adobe
// All Rights Reserved.

// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
// */

// // This script is to generate a Bearer Token.
// // How to run:
// // node src/sample/psapi/00_getAdobeConfig.js

// // const sdk = require('../../../config/config')
// const { adobeConfig } = require('../../../config/adobe')
// const { getAccessTokenByClientCredentials } = require('@adobe/aio-lib-ims')

// main()

// async function main() {
//   try {
//     const token = await getAccessTokenByClientCredentials(adobeConfig.clientId, adobeConfig.clientSecret, adobeConfig.orgId, adobeConfig.scopes)
//     console.log(`Token: ${token}`)
//   } catch (e) {
//     console.error(e)
//   }
// }