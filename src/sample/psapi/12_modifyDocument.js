/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsFunctions = require('../../lib/awsFunctions')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.psd'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.psd)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.psd',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test12.psd'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PSD
    }

    const options = {
      layers: [
        {
          edit: {},
          name: "Hello",
          text: {
            content: "Good Bye"
          }
        },
        {
          add: {
            insertTop: true
          },
          type: "adjustmentLayer",
          adjustments: {
            hueSaturation: {
              colorize: true,
              channels: [
                {
                  channel: "master",
                  hue: 0,
                  saturation: -100,
                  lightness: 0
                }
              ]
            }
          }
        }
      ]
    }

    const job = await client.modifyDocument(input, output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test12.psd')}\n`)

  } catch (e) {
    console.error(e)
  }
}
