# Adobe Photoshop API Samples

## Preparation

#### Create a Photoshop API credential

[Sign up](https://developer.adobe.com/photoshop/api/signup/?ref=signup) to create a credential in order to use Photoshop API. When creating a credential, a zip file (*config.zip*) will be automatically downloaded. It contains your private key (*private.key*).  Please store the private key securely, since Adobe does not retain a copy of it.

## Get Client ID (apiKey) and Token

There are 2 ways to get Client ID and Token:

##### 1. Using Adobe Console:

Client ID (API Key)
1. Go to https://console.adobe.io/projects
1. Select a project
1. Select "Adobe Photoshop API (Trial)"
1. Find `CLIENT ID` in "Service account (JWT)" section

Generate Token
1. Open and copy the contents of *private.key* in downloaded *config.zip*
1. Go to https://console.adobe.io/projects
1. Select a project
1. Select "Adobe Photoshop API (Trial)"
1. Paste into private key text box in "Generate access token" section and click "Generate Token" button

##### 2. Using a Script:
1. Go to https://console.adobe.io/projects
1. Select a project
1. Select Service Account (JWT) and find `CLIENT ID`, `CLIENT SECRET`, `TECHNICAL ACCOUNT ID`, `ORGANIZATION ID`
1. Save `config/config-template.js` as `config/config.js`, fill the following values in `config/config.js`, and save.
```
const adobeConfig = {
  clientId: "",
  clientSecret: "",
  technicalAccountId: "",
  orgId: "",
  metaScopes: ["ent_ccas_sdk"]
};
```
1. Run `node src/sample/psapi/00_getAdobeConfig.js` to generate a Token (to be expired in 24 hrs) 

## Run a script (.sh)
1. Fill your generated Token and Client ID (apiKey) in a script (ex: hello.sh, documentManifest.sh)
token=''
apiKey=''
1. Run a script on Terminal (mac) or on git-bash (windows)
```
bash hello.sh
```