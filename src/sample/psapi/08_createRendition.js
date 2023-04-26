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
      // href: await awsLib.getSignedUrl('getObject', 'input/input01.psd'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.psd)
      href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input01.psd',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = [
      {
        href: await awsLib.getSignedUrl('putObject', 'output/test08.jpg'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.JPEG,
        width: 300,
        quality: 7
      },
      {
        href: await awsLib.getSignedUrl('putObject', 'output/test08.png'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.PNG,
        width: 260,
        compression: sdk.psApiLib.PngCompression.MEDIUM
      },
      {
        href: await awsLib.getSignedUrl('putObject', 'output/test08.tiff'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.TIFF,
        width: 230
      }
    ]

    const job = await client.createRendition(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File #1: ${await awsLib.getSignedUrl('getObject', 'output/test08.jpg')}\n`)
    console.log(`Output File #2: ${await awsLib.getSignedUrl('getObject', 'output/test08.png')}\n`)
    console.log(`Output File #3: ${await awsLib.getSignedUrl('getObject', 'output/test08.tiff')}\n`)

  } catch (e) {
    console.error(e)
  }
}