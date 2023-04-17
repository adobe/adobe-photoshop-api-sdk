/*
Copyright 2022 Adobe
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

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test09.psd'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PSD
    }

    const options = {
      document: {
        width: 960,
        height: 586,
        resolution: 72,
        fill: sdk.psApiLib.BackgroundFill.TRANSPARENT,
        mode: sdk.psApiLib.Colorspace.RGB
      },
      layers: [
        {
          add: {},
          bounds: {
            top: 0,
            left: 0,
            width: 200,
            height: 100
          },
          type: sdk.psApiLib.LayerType.TEXT_LAYER,
          text: {
            content: "Hello",
            characterStyles: [
              {
                fontSize: 72
              }
            ]
          }
        },
        {
          add: {
            insertTop: true
          },
          type: sdk.psApiLib.LayerType.ADJUSTMENT_LAYER,
          adjustments: {
            brightnessContrast: {
              brightness: -50
            }
          }
        },
        {
          input: {
            // href: await awsFunctions.getSignedUrl('getObject', 'input/input03.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
            href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input03.jpg',
            storage: sdk.psApiLib.Storage.EXTERNAL,
          },
          type: sdk.psApiLib.LayerType.LAYER,
          name: 'New Layer 1'
        }
      ]
    }

    const job = await client.createDocument(output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test09.psd')}\n`)

  } catch (e) {
    console.error(e)
  }
}