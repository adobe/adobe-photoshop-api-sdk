# Adobe Photoshop API SDK

## To Get Started

You’ll need to have: 

1. Access to Photoshop API. If you don't already have credentials you can create them by signing up [here](https://developer.adobe.com/photoshop/api/signup/?ref=signup).
   1. Enter your project name and click on “Create credentials” and keep an eye out for the   Config.zip that will automatically download
   ![](docs/configzip.jpg)
1. Access to AWS
   1. If you don't already have an AWS account you can create one [here](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html).

#### Install AWS CLI and Prepare Storage

1. If you do not have an AWS access key already you will need to create one by going to [AWS IAM console](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-west-2#/users).

1. Click on your user name an you should then you should see this screen.
1. Click on security credentials
1. CLick on create access key
1. Choose Command Line interface and click next 
1. Click on Create access Key and download the .csv file and store it in a secure location
1. Copy and paste Secret access key to clipboard
1. Set up AWS CLI
   1. Install AWS CLI for your operating system
   1. Configure AWS CLI by running the following command  aws configure if you already have an aws profile you would need to run aws configure [--profile profile-name]
   1. You will need to answer these questions below so make sure you you have your Access Key and Secret Access Key handy
      1. Add your access key 
      1. Secret access key 
      1. Default region (choose a region closest to you for faster processing) 
      1. Default output format: NONE
      1. For more information please refer to https://docs.aws.amazon.com/cli/latest/reference/configure/index
   1. Test AWS CLI: aws s3 ls to list S3 objects

#### Download this project

1. Clone this project: `git clone https://github.com/adobe/adobe-photoshop-api-sdk`
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
- [Demo](https://developer.adobe.com/photoshop/api/demo/)
- [Curl command examples](https://developer.adobe.com/photoshop/photoshop-api-docs/code-sample/)
- [Create a credential](https://developer.adobe.com/photoshop/api/signup/?ref=signup)
- [Supported Features](https://developer.adobe.com/photoshop/photoshop-api-docs/features/)
- [Submit a ticket for support or feedback](https://psd-services.zendesk.com/hc/en-us/requests/new)
