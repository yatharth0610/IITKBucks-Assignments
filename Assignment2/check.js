const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var pubKey = '';
var encrypted = '';
var unencrypted = '';

rl.question('Enter the path of the file: ', str => {
    pubKey = fs.readFileSync("public.pem");
    rl.question('Enter the encrypted text: ', str => {
        encrypted = str;
        rl.question('Enter the unencrypted text: ', str => {
            unencrypted = str;
            const verify = crypto.createVerify('SHA256')
            verify.update(Buffer.from(unencrypted, 'utf8'))
            verifyRes = verify.verify({key:pubKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(encrypted, 'hex'))
            if (verifyRes === true) console.log("Signature Verified!");
            else console.log("Verification Failed");
            rl.close();
        });
    });
});

