/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// This script is to generate a Bearer Token.
// How to run:
// node src/sample/psapi/00_getAdobeConfig.js

const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const token = await sdk.getToken()
    console.log(`Client Id (apiKey): ${sdk.adobeConfig.clientId}`)
    console.log(`Token: ${token}`)
  } catch (e) {
    console.error(e)
  }
}