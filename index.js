#!/usr/bin/env node

const { exec } = require('child_process');

exec('git --version', (error, stdout, stderr) => {
    if (error) {
        console.error('Git not found.  Please install Git.');
        return;
    }
    console.log('creating a Photoshop API Project...');

    const repoURL = 'https://github.com/adobe/adobe-photoshop-api-sdk.git';
    const projectName = 'create-adobe-photoshop-api-sdk';

    exec(`git clone ${repoURL} ${projectName}`, (cloneError, cloneStdout, cloneStderr) => {
        if (cloneError) {
            console.error(`Git clone error: ${cloneError}`);
            return;
        }
        console.log(cloneStdout.trim());

        console.log(`Installing dependencies in ${projectName}...`);
        exec(`cd ${projectName} && npm install`, (installError, installStdout, installStderr) => {
            if (installError) {
                console.error(`npm install error: ${installError}`);
                return;
            }
            console.log(installStdout.trim());

            console.log(`
Project setup is complete! 🎉

To get started:
1. cd ${projectName}
2. Open config/adobe-template.js, save as config/adobe.js, and fill your credential information. You can retrive your credential information from Adobe Devloper Console (https://developer.adobe.com/console/projects). If you have not created your credential yet, go to https://developer.adobe.com/photoshop/api/signup/?ref=signup and create your credential.
3. Run a sample script:
   - npm src/samples/01_hello_world.js

For more details, refer to the README in the project directory.
            `);
        });
    });
});