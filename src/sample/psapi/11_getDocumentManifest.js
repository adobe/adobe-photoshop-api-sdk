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

    const job = await client.getDocumentManifest(input)
    console.log(JSON.stringify(job.outputs[0],null,2))
    console.log(`${job.isDone()} - ${job.jobId}`)
    // console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}