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

    const output = [
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.jpg'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.JPEG,
        width: 300,
        quality: 7
      },
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.png'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.PNG,
        width: 260,
        compression: sdk.psApiLib.PngCompression.MEDIUM
      },
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.tiff'),
        storage: sdk.psApiLib.Storage.EXTERNAL,
        type: sdk.psApiLib.MimeType.TIFF,
        width: 230
      }
    ]

    const job = await client.createRendition(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File #1: ${await awsFunctions.getSignedUrl('getObject', 'output/test08.jpg')}\n`)
    console.log(`Output File #2: ${await awsFunctions.getSignedUrl('getObject', 'output/test08.png')}\n`)
    console.log(`Output File #3: ${await awsFunctions.getSignedUrl('getObject', 'output/test08.tiff')}\n`)

  } catch (e) {
    console.error(e)
  }
}