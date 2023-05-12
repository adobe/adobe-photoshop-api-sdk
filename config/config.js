/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const { awsConfig } = require('./aws')
const { adobeConfig } = require('./adobe')
const psApiLib = require('@adobe/aio-lib-photoshop-api') // https://github.com/adobe/aio-lib-photoshop-api
const auth = require("@adobe/jwt-auth") // https://www.npmjs.com/package/@adobe/jwt-auth
const fs = require("fs")

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