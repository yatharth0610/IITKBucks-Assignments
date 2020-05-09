const { generateKeyPair } = require('crypto'); 
const crypto = require('crypto');
const fs = require('fs');

generateKeyPair('rsa', { 
  modulusLength : 2048, 
  publicKeyEncoding: { 
    type: 'spki', 
    format: 'pem'
  }, 
  privateKeyEncoding: { 
    type: 'pkcs8', 
    format: 'pem',
  } 
}, 
 (err, publicKey, privateKey) => { 
       if(!err) 
       { 
         // Prints new asymmetric key 
         // pair after encodings 
         console.log("Public Key is: ", 
                  publicKey.toString('hex')); 
         console.log(); 
         console.log("Private Key is: ", 
                 privateKey.toString('hex')); 

        fs.writeFileSync("public.pem", publicKey);
        fs.writeFileSync("private.pem", privateKey);
       } 
       else
       { 
         // Prints error 
         console.log("Errr is: ", err); 
       } 
         
  }); 