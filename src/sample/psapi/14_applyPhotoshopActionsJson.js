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
      storage: 'external'
    }
  
    const output = {
      href: await awsLib.getSignedUrl('putObject', 'output/test14.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PSD
    }
  
    /*
      actionJson performs:
      - apply traceContour filter to the original image
      - place the additional image in a new layer (note the placeholder ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_0 for path field) and resize
      - rename the newly created layer
    */
   const actionJSON = [
      {"_obj":"canvasSize","height":{"_unit":"pixelsUnit","_value":3000.0},"horizontal":{"_enum":"horizontalLocation","_value":"center"},"vertical":{"_enum":"verticalLocation","_value":"center"},"width":{"_unit":"pixelsUnit","_value":3000.0}},
      {"_obj":"copyEvent"},
      {"_obj":"move","_target":[{"_enum":"ordinal","_ref":"layer"}],"to":{"_obj":"offset","horizontal":{"_unit":"pixelsUnit","_value":0.0},"vertical":{"_unit":"pixelsUnit","_value":0.0}}},
      {"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_enum":"ordinal","_value":"allEnum"}},
      {"_obj":"cut","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_obj":"offset","horizontal":{"_unit":"pixelsUnit","_value":0.0},"vertical":{"_unit":"pixelsUnit","_value":0.0}}},
      {"_obj":"inverse"},
      {"_obj":"syntheticFill","_target":[{"_enum":"ordinal","_ref":"document"}],"mode":{"_enum":"syntheticFillMode","_value":"inpaint"},"prompt":"fill the background","serviceID":"clio","serviceOptionsList":{"clio":{"_obj":"clio","gi_CONTENT_PRESERVE":0,"gi_CROP":false,"gi_DILATE":false,"gi_ENABLE_PROMPT_FILTER":true,"gi_GUIDANCE":6,"gi_MODE":"tinp","gi_NUM_STEPS":-1,"gi_PROMPT":"fill the background","gi_SEED":-1,"gi_SIMILARITY":0}}}
    ]
    


    const options = {
      actionJSON: actionJSON,
      additionalImages: [
        {
          href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input02.jpg',
          storage: 'external'
        }
      ]
    }
  
    const job = await client.applyPhotoshopActionsJson(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)
    console.log(`Output File: ${await awsLib.getSignedUrl('getObject', 'output/test14.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}
