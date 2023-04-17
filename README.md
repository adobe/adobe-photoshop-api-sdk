# Adobe Photoshop API SDK

## Preparation

#### Create Photoshop API credential

1. [Sign up](https://developer.adobe.com/photoshop/api/signup/?ref=signup) to create a credential in order to use Photoshop API. When creating a credential, a zip file (_config.zip_) will be automatically downloaded. It contains your private key (_private.key_). Please store the private key securely, since Adobe does not retain a copy of it.

#### Prepare Storage

AWS

1. [Create AWS accont](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html)
1. Set up AWS CLI
   1. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   1. Configure [AWS CLI options](https://docs.aws.amazon.com/cli/latest/reference/configure/index.html): `aws configure`
   1. Test AWS CLI: `aws s3 ls` to list S3 objects

#### Download this project

1. Clone this project: `git clone https://github.com/adobe/adobe-photoshop-api-sdk.git`
1. Install node modules: `npm install`
1. Unzip your downloaded _config.zip_ and save `private.key` as `config/private.key` in this project
1. Save `config/config-template.js` as `config/config.js`
1. Fill the following configuration in `config/config.js`, save, and close.

```
// Adobe Photoshop API Configuration
// https://developer.adobe.com/console/projects -> project -> Service Account (JWT)
const adobeConfig = {
  clientId: "",
  clientSecret: "",
  technicalAccountId: "",
  orgId: "",
  metaScopes: ["ent_ccas_sdk"],
};
```

```
// AWS Configuration
// https://aws.amazon.com/console/
const awsConfig = {
  region: "", // us-east-1
  bucketName: "" // aws s3 bucket name
}
```

## Sample Script

#### Run a sample script (src/sample/psapi/...)

1. Run a sample

```
node src/sample/psapi/01_createCutout.js
```

2. Find your output file in your S3 storage, output directory (ex: s3://<awsConfig.bucketName>/output/...)

#### Run a sample scrip for a batch job (src/sample/batch_script/...)

1. Store multiple JPEG files in your S3 storage (ex: s3://<awsConfig.bucketName>/input/...) or modify input/output directories in the sample script.
```
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
```
2. Run a sample

```
node src/sample/batch_job/01_createCutout_batch.js
```

3. Find your output files in your S3 storage, output directory (ex: s3://<awsConfig.bucketName>/input/output/...)

- You can also use AWS CLI to sync files from your S3 storage into your local machine (ex: `aws s3 sync s3://<awsConfig.bucketName>/input/output/ /Users/<username>/Desktop/output/`)

## Links

- [Photoshop API documentation](https://developer.adobe.com/photoshop/photoshop-api-docs/api/)
- [Demo](https://developer.adobe.com/photoshop/api/)
- [Curl command examples](https://developer.adobe.com/photoshop/photoshop-api-docs/code-sample/)
- [Create a credential](https://developer.adobe.com/photoshop/api/signup/?ref=signup)
- [Supported Features](https://developer.adobe.com/photoshop/photoshop-api-docs/features/)
- [Submit a ticket for support or feedback](https://psd-services.zendesk.com/hc/en-us/requests/new)
