const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the path of the file: ", path => {
    let data = []
    let temp = fs.readFileSync(path);
    temp = temp.toString('utf8');
    data = temp.split`,`.map(x => +x);
    getDetails(data);
    rl.close();
})

class Input {
    constructor (transactionID, index, sign_length, sign) {
        this.transactionID = transactionID;
        this.index = index;
        this.sign_length = sign_length;
        this.sign = sign;
    }
}

class Output {
    constructor (coins, pubkey_len, pub_key){
        this.coins = coins;
        this.pubkey_len = pubkey_len;
        this.pub_key = pub_key;
    }
}

function intFromBytes(x) {
    let val = 0;
    for (var i = 0; i < x.length; i++) {
        val += x[i];
        if (i < x.length-1) {
            val = val << 8;
        }
    }
    return val;
}

function getDetails (data) {
    const transactionID_curr = crypto.createHash('sha256').update(Buffer.from(data)).digest('hex');
    let Inputs = []
    let Outputs = [];
    let curr = 0;

    let arr = data.slice(0,4);
    curr = curr + 4;
    const numInputs = intFromBytes(arr);

    for (let i = 0; i < numInputs; i++) {
        let arr = data.slice(curr, curr + 32);
        curr = curr + 32;
        let transactionID = new Buffer.from(arr).toString('hex');
        arr = data.slice(curr, curr+4);
        curr = curr + 4;
        let index = intFromBytes(arr);
        arr = data.slice(curr, curr + 4);
        curr = curr + 4;
        let sign_length = intFromBytes(arr);
        arr = data.slice(curr, curr+sign_length);
        curr = curr + sign_length;
        let signature = new Buffer.from(arr).toString('hex');
        let In = new Input(transactionID, index, sign_length, signature);
        Inputs.push(In);
    }

    arr = data.slice(curr, curr+4);
    curr = curr+4
    const numOutputs = intFromBytes(arr);

    for (let i = 0; i < numOutputs; i++){
        let arr = data.slice(curr, curr + 8);
        curr = curr + 8;
        let coins = intFromBytes(arr);
        arr = data.slice(curr, curr+4);
        curr = curr+4;
        let pubkey_len = intFromBytes(arr);
        arr = data.slice(curr, curr + pubkey_len);
        curr = curr + pubkey_len;
        let pub_key = new Buffer.from(arr).toString();
        let Out = new Output(coins, pubkey_len, pub_key);
        Outputs.push(Out);
    }

    console.log("Transaction ID: " + transactionID_curr);
    console.log("\nNumber of inputs: ", numInputs);

    let i = 1;
    for (let input of Inputs) {
        console.log(`\n   Input ${i}:`);
        console.log("       Transaction ID: " + input.transactionID);
        console.log("       Index: ", input.index);
        console.log("       Length of signature: ", input.sign_length);
        console.log("       Signature: ", input.sign);
        i++;
    }

    console.log ("\nNumber of Outputs: ", numOutputs);
    i = 1;
    for (let output of Outputs) {
        console.log(`\n   Output ${i}:`);
        console.log("       Number of coins: ", output.coins);
        console.log("       Length of public Key: ", output.pubkey_len);
        console.log("       Public Key: ", output.pub_key);
        i++;
    }
}