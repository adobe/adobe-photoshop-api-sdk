/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const fs = require('fs')
const path = require('path')
const { adobeConfig } = require('./adobe')

let awsConfig
if (fs.existsSync(path.join(__dirname, 'aws.js'))) {
    awsConfig = require('./aws').awsConfig // config file for AWS S3
}

const psApiLib = require('@adobe/aio-lib-photoshop-api') // https://github.com/adobe/aio-lib-photoshop-api
const { Ims } = require('@adobe/aio-lib-ims') // https://www.npmjs.com/package/@adobe/aio-lib-ims

const { description, version } = require('../package.json')
const userAgentHeader = `${description}/${version}`

async function getToken() {
  const ims = new Ims()
  const response = await ims.getAccessTokenByClientCredentials(adobeConfig.clientId, adobeConfig.clientSecret, adobeConfig.orgId, adobeConfig.scopes)
  return response.access_token.token
}

async function initSDK() {
  const token = await getToken()
  return await psApiLib.init(adobeConfig.orgId, adobeConfig.clientId, token, undefined, {
    'User-Agent': userAgentHeader
  })
}

module.exports = {
  ...awsConfig ? { awsConfig } : {},
  adobeConfig,
  psApiLib,
  getToken,
  initSDK
}