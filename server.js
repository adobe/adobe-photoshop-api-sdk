const express = require('express');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

const app = express();

app.get('/s3-bundle.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(__dirname + '/public/s3-bundle.js');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

https.createServer(options, app).listen(443, () => {
  console.log('Server is running on https://localhost:443/');
});