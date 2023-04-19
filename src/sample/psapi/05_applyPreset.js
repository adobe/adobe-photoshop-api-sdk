/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsLib = require('../../lib/awsLib')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsLib.getSignedUrl('getObject', 'input/input03.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input03.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input03.jpg',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const preset = {
      // href: await awsLib.getSignedUrl('getObject', 'input/Auto-BW.xmp'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/Auto-BW.xmp)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/vignette_b.xmp',
      storage: sdk.psApiLib.Storage.EXTERNAL
    }

    const output = {
      href: await awsLib.getSignedUrl('putObject', 'output/test05.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const job = await client.applyPreset(input, preset, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsLib.getSignedUrl('getObject', 'output/test05.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}