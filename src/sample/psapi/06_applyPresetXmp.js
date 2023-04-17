const awsFunctions = require('../../lib/awsFunctions')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input03.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input03.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input03.jpg',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test06.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const options = '<?xml version="1.0"?><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        "><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" rdf:about="" crs:PresetType="Normal" crs:Cluster="" crs:UUID="47D5B8888456439D852D7CD225450652" crs:SupportsAmount="False" crs:SupportsColor="True" crs:SupportsMonochrome="True" crs:SupportsHighDynamicRange="True" crs:SupportsNormalDynamicRange="True" crs:SupportsSceneReferred="True" crs:SupportsOutputReferred="True" crs:CameraModelRestriction="" crs:Copyright="" crs:ContactInfo="" crs:Version="12.2.1" crs:ProcessVersion="11.0" crs:ConvertToGrayscale="True" crs:AutoGrayscaleMix="True" crs:CameraProfile="Default Monochrome" crs:HasSettings="True"><crs:Name><rdf:Alt><rdf:li xml:lang="x-default">Auto-BW</rdf:li></rdf:Alt></crs:Name><crs:ShortName><rdf:Alt><rdf:li xml:lang="x-default"/></rdf:Alt></crs:ShortName><crs:SortName><rdf:Alt><rdf:li xml:lang="x-default"/></rdf:Alt></crs:SortName><crs:Group><rdf:Alt><rdf:li xml:lang="x-default"/></rdf:Alt></crs:Group><crs:Description><rdf:Alt><rdf:li xml:lang="x-default"/></rdf:Alt></crs:Description><crs:Look crs:Name=""/></rdf:Description></rdf:RDF></x:xmpmeta>'

    const job = await client.applyPresetXmp(input, output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test06.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}