/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { awsConfig } = require('../../../config/config')
const awsLib = require('../../lib/awsLib')
const sdk = require('../../../config/config')
const path = require('path');
const fs = require('fs')
let client

// -------------------------------------------------
// Enter your parameters
// -------------------------------------------------
const inputDir = 'input/' //your input directory in S3 bucket (ex: s3://<awsConfig.bucketName>/input)
const outputDir = 'output' //your output directory in S3 bucket (ex: s3://<awsConfig.bucketName>/input/output)

const listObjectsInputRequest = { //URI Request Parameters
  // Add more request as you like.  see https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html for more details
  Bucket: awsConfig.bucketName, //Bucket name to list.
  Prefix: inputDir, // Keys that begin with the indicated prefix.
  MaxKeys: 5 // Sets the maximum number of keys returned in the response. By default the action returns up to 1,000 key names.
};
// -------------------------------------------------

main()

async function main() {
  client = await sdk.initSDK()
  const inputs = await awsLib.listObjects(listObjectsInputRequest)
  console.log(`${inputs.Contents.length} input files`)
  
  inputs.Contents.forEach( async content => {
    console.debug(` content: ${content.Key}`)
    const inputSingedUrl = await awsLib.getSignedUrl('getObject', content.Key)
    const outputSingedUrl = await awsLib.getSignedUrl('putObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}.png`)
    createCutout(inputSingedUrl, outputSingedUrl, content)
  })
}

async function createCutout(inputSingedUrl, outputSingedUrl, content) {
  try {
    const input = {
      href: inputSingedUrl,
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }
    const output = {
      href: outputSingedUrl,
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }
    const job = await client.createCutout(input, output)
    // console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}