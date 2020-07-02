const crypto = require ('crypto');
const { parentPort } = require('worker_threads');

let comparedStr = '0000';
for (let i = 0; i < 60; i++) {
    comparedStr += 'f';
}

parentPort.on('message', message => {
    let str = message.data;
    let nonce = mine(str);
    parentPort.postMessage({nonce : nonce});
});

function mine(str) {
    let i = 0;
    let str_new;

    do {
        i++;
        str_new = str + i;
        hashed = crypto.createHash('sha256').update(str_new).digest('hex');
    } while (hashed >= comparedStr);

    return i;
}
