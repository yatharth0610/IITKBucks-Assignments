const crypto = require ('crypto');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let comparedStr = '0000';
for (let i = 0; i < 60; i++) {
    comparedStr += 'f';
}

//console.log(comparedStr);

rl.question('Enter a string: ', str => {
    const magicNumber = mine(str);
    console.log(magicNumber);
    rl.close();
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
