#!/bin/bash

# Copyright 2022 Adobe
# All Rights Reserved.

# NOTICE: Adobe permits you to use, modify, and distribute this file in
# accordance with the terms of the Adobe license agreement accompanying
# it.

# set -x

# ************************************
# Check if jq is installed
# ************************************
if [ ! `which jq` ]; then
	echo "************************************"
	echo "Please install jq: brew install jq"
	echo "************************************"
	exit 1
fi

# ************************************
# Set variables
# ************************************
token=''
apiKey=''
endpoint='https://image.adobe.io/pie/psdService/documentManifest'
method='POST'
payload='{
  "inputs": [
    {
      "href": "https://github.com/AdobeDocs/cis-photoshop-api-docs/raw/main/sample_files/Sunflower.psd",
      "storage": "external"
    }
  ],
  "options": {
    "thumbnails": {
      "type": "image/png"
    }
  }
}'

# ************************************
# Call API
# ************************************
res=$(curl -k -Ss -H "Authorization: Bearer $token" -H "Content-Type:application/json" -H "x-api-key: $apiKey" -X "$method" -d "$payload" "$endpoint")
myerror=$(echo $res | jq -r .code)
if [ $myerror != "null" ]; then
	echo "ERROR: $res"
	exit 1
fi
jobid=$(echo $res | jq -r ._links.self.href)
echo "JOBID: $jobid"

while [ "x$jobstatus" != "xsucceeded" ] && [ "x$jobstatus" != "xfailed" ]; do
	output=$(curl -k -Ss -H "Authorization: Bearer $token" -H "Content-Type:application/json" -H "x-api-key: $apiKey" -X GET "$jobid" | jq -r '.outputs[0]')
	jobstatus=$(echo $output | jq -r '.status')
	echo "JOBSTATUS: $jobstatus"
done

echo "RESULT"
echo ""
echo $output | jq

