const awsFunctions = require('../../lib/awsFunctions')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.jpg',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test13.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const options = {
      actions: [
        {
          // href: await awsFunctions.getSignedUrl('getObject', 'input/fisheye.atn'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/fisheye.atn)
          href: 'https://github.com/kmikawa/testfiles/raw/main/input/fisheye.atn',
          storage: sdk.psApiLib.Storage.EXTERNAL,
        }
      ]
    }

    const job = await client.applyPhotoshopActions(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test13.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}
