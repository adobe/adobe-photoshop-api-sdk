#!/bin/bash
# set -x

# ************************************
# Set variables
# ************************************
# TOKEN
# 1. Open and copy the contents of private.key in downloaded config.zip
# 2. Go to https://console.adobe.io/projects
# 3. Select a project
# 4. Select "Adobe Photoshop API (Trial)"
# 5. Paste into private key text box in "Generate access token" section and click "Generate Token" button
token=''
#
# CLIENT ID (API KEY)
# 1. Go to https://console.adobe.io/projects
# 2. Select a project
# 3. Select "Adobe Photoshop API (Trial)"
# 4. Find CLIENT ID in "Service account (JWT)" section
apiKey=''
#
# ************************************
# Call API
# ************************************
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer $token" \
  --header "x-api-key: $apiKey"