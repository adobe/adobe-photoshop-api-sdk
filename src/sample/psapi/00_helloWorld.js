/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// How to run:
// node src/sample/psapi/00_helloWorld.js

const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()
    const job = await client.helloWord()
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
  } catch (e) {
    console.error(e)
  }
}