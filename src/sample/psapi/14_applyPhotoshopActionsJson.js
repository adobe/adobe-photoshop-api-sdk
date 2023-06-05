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
      href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input03.jpg',
      storage: 'adobe'
    }
  
    const output = {
      href: await awsLib.getSignedUrl('putObject', 'output/test14.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PSD
    }
  
    const options = {
      actionJSON: [
        {"_obj":"traceContour","edge":{"_enum":"contourEdge","_value":"upper"},"level":148},
        {"_obj":"placeEvent","freeTransformCenterState":{"_enum":"quadCenterState","_value":"QCSAverage"},"height":{"_unit":"percentUnit","_value":51.83142658062201},"null":{"_kind":"local","_path":"ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_0"},"offset":{"_obj":"offset","horizontal":{"_unit":"pixelsUnit","_value":298.34811239846806},"vertical":{"_unit":"pixelsUnit","_value":127.16503382715794}},"replaceLayer":{"_obj":"placeEvent","to":{"_id":5,"_ref":"layer"}},"width":{"_unit":"percentUnit","_value":51.83142658062201}}
      ],
      additionalImages: [
        {
          href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input01.jpg',
          storage: 'adobe'
        }
      ]
    }
  
    const job = await client.applyPhotoshopActionsJson(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)
    console.log(`Output File: ${await awsLib.getSignedUrl('getObject', 'output/test13.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}
