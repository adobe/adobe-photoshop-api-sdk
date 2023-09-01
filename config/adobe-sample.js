/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
// Adobe Photoshop API Configuration
// Everything you need to fill out can be found in your console: (https://developer.adobe.com/console/projects -> project -> OAuth Server-to-Server)
// If you have not created your credential yet, go to https://developer-stage.adobe.com/photoshop/photoshop-api-docs/getting-started/#get-access

const adobeConfig = {
  clientId: '',
  clientSecret: '',
  orgId: '',
  scopes: 'openid,AdobeID'
};

module.exports = {
  adobeConfig
}