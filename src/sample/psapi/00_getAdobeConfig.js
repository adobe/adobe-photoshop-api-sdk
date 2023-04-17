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