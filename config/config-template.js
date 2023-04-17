// *************************************************************************************
// START - Enter your configuration
// *************************************************************************************

// Adobe Photoshop API Configuration
// https://developer.adobe.com/console/projects -> project -> Service Account (JWT)
const adobeConfig = {
  clientId: "",
  clientSecret: "",
  technicalAccountId: "",
  orgId: "",
  metaScopes: ["ent_ccas_sdk"],
};

// AWS Configuration
// https://aws.amazon.com/console/
const awsConfig = {
  // identityPoolId: "", // [OPTIONAL] IDENTITY_POOL_ID e.g., eu-east-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  region: "", // us-east-1
  bucketName: "" // aws s3 bucket name
}

// *************************************************************************************
// END - Enter your configuration
// *************************************************************************************
// *************************************************************************************
// *************************************************************************************
const psApiLib = require('@adobe/aio-lib-photoshop-api') // https://github.com/adobe/aio-lib-photoshop-api
const auth = require("@adobe/jwt-auth") // https://www.npmjs.com/package/@adobe/jwt-auth
const fs = require("fs")
const path = require('path');

const { description, version } = require('../package.json');
const userAgentHeader = `${description}/${version}`

async function getToken() {
    adobeConfig.privateKey = fs.readFileSync(`${__dirname}/private.key`)
    const token = await auth(adobeConfig)
    return token.access_token
}

async function initSDK() {
  const token = await getToken()
  return await psApiLib.init(adobeConfig.orgId, adobeConfig.clientId, token, undefined, {
    'User-Agent': userAgentHeader
  })
}

module.exports = {
  awsConfig,
  adobeConfig,
  psApiLib,
  getToken,
  initSDK
}