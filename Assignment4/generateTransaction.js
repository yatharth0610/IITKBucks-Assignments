const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the path of the file: ", path => {
    let str = fs.readFileSync(path);
    getDetails(str);
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

function getInt(str, start, end)
{
    let size = end - start;
    if(size === 4)
    {
        let ans = 0;
        for(let i = 0; i < size; ++i)
        {
            ans = ans << 8;
            ans += str[i + start];
        }
        return ans;
    }

    else
    {
        let ans = 0n;
        for (let i = 0; i < size; ++i)
        {
            ans = ans * 256n;
            ans += BigInt(str[i+start])
        }
        return ans;
    }
}

function getDetails (str) {
    const transactionID_curr = crypto.createHash('sha256').update(str).digest('hex');
    let Inputs = [];
    let Outputs = [];
    let curr = 0;

    const numInputs = getInt(str, 0, 4);
    curr = curr + 4;

    for (let i = 0; i < numInputs; i++) {
        let transactionID = str.toString("hex", curr, curr+32);
        curr += 32;
        let index = getInt(str, curr, curr+4);
        curr += 4;
        let sign_length = getInt(str, curr, curr+4);
        curr += 4;
        let signature = str.toString("hex", curr, curr + sign_length);
        curr += sign_length;
        let In = new Input(transactionID, index, sign_length, signature);
        Inputs.push(In);
    }

    const numOutputs = getInt(str, curr, curr+4);
    curr += 4;

    for (let i = 0; i < numOutputs; i++){
        let coins = getInt(str, curr, curr+8);
        curr += 8;
        let pubkey_len = getInt(str, curr, curr+4);
        curr += 4;
        let pub_key = str.toString("utf-8", curr, curr + pubkey_len);
        curr += pubkey_len;
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