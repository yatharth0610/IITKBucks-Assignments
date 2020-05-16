const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
        this.pubkey = pub_key;
    }
}

class Transaction {
    constructor (numInputs, Inputs, numOutputs, Outputs) {
        this.numInputs = numInputs;
        this.Inputs = Inputs;
        this.numOutputs = numOutputs;
        this.Outputs = Outputs;
    }
}

function toBytesInt32 (num) {
    arr = new ArrayBuffer(4); 
    view = new DataView(arr);
    view.setUint32(0, num, false); 
    return arr;
}

function toBytesInt64 (num){
    var bytes = [];
    var i = 8;
    do {
    bytes[--i] = num & (255);
    num = num>>8;
    } while (i)
    return bytes;
}

var numInputs = 0;
var Inputs = [];
var numOutputs = 0;
var coins = 0;
var pubkey_len = 0;
var pubkey = '';
var Outputs = [];
var transactionID = '';
var index = 0;
var sign_length = 0;
var sign = '';

const q1 = () => {
    return new Promise((resolve,reject) => {
        rl.question('Enter the number of inputs: ', num => {
            numInputs = Number(num);
            if (Number(num) < 0) {
                console.log("Invalid Number");
                numInputs = 0;
            }
            resolve();
        });
    });
}

const q2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the transaction ID: ', ID => {
            transactionID = ID;
            resolve();
        });
    });
}

const q3 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the output Index: ', num => {
            index = Number(num);
            if (Number(num) < 0) {
                console.log("Invalid Number");
                index = 0;
            }
            resolve();
        });
    });
}

const q4 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the length of signature: ', len => {
            sign_length = Number(len);
            if (sign_length < 0) {
                console.log("Invalid Input");
                sign_length = 0;
            }
            resolve();
        });
    });
}

const q5 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the signature: ', signature=> {
            sign = signature;
            resolve();
        });
    });
}

const q6 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the number of outputs: ', num => {
            numOutputs = Number(num);
            if (numOutputs < 0) {
                console.log("Invalid Input");
                numOutputs = 0;
            }
            resolve();
        });
    });
}

const q7 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the number of coins: ', num => {
            coins = Number(num);
            if (coins < 0) {
                console.log("Invalid Input");
                coins = 0;
            }
            resolve();
        });
    });
}

const q8 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the length of public key: ', num => {
            pubkey_len = Number(num);
            if (pubkey_len < 0) {
                console.log("Invalid Input");
                pubkey_len = 0;
            }
            resolve();
        });
    });
}

const q9 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the path for public key: ', path => {
            pubkey = fs.readFileSync(path, 'utf8');
            resolve();
        });
    });
}

function transactionToByteArray (transaction) {
    var data = [];
    data = new Uint8Array(data.concat(toBytesInt32(transaction.numInputs))[0]);
    data = [...data];
    for (let i = 0; i < transaction.numInputs; i++) {
        let temp = [];
        let str1 = transaction.Inputs[i].transactionID;
        temp = new Uint8Array(Buffer.from(str1, 'hex'));
        temp = [...temp];
        while (temp.length != 32) temp.unshift(0);
        data = data.concat(temp);
        let num1 = transaction.Inputs[i].index;
        temp = [];
        temp = new Uint8Array(temp.concat(toBytesInt32(num1))[0]);
        temp = [...temp];
        data = data.concat(temp);
        let num2 = transaction.Inputs[i].sign_length;
        temp = [];
        temp = new Uint8Array(temp.concat(toBytesInt32(num2))[0]);
        temp = [...temp];
        data = data.concat(temp);
        let str2 = transaction.Inputs[i].sign;
        temp = [];
        temp = new Uint8Array(Buffer.from(str1, 'hex'));
        temp = [...temp];
        data = data.concat(temp);
    }
    let out = transaction.numOutputs;
    let temp = [];
    temp = new Uint8Array(temp.concat(toBytesInt32(out))[0]);
    temp = [...temp];
    data = data.concat(temp);
    for (let i = 0; i < transaction.numOutputs; i++){
        let arr = [];
        let num1 = transaction.Outputs[i].coins;
        arr = new Uint16Array(arr.concat(toBytesInt64(num1)));
        arr = [...arr];
        data = data.concat(arr);
        let num2 = transaction.Outputs[i].pubkey_len;
        arr = [];
        arr = new Uint8Array(arr.concat(toBytesInt32(num2))[0]);
        arr = [...arr];
        data = data.concat(arr);
        let str = transaction.Outputs[i].pubkey;
        arr = [];
        arr = new Uint8Array(Buffer.from(str, 'utf-8'));
        arr = [...arr];
        data = data.concat(arr);
    }
    console.log(data);
    let hashed = crypto.createHash('sha256').update(Buffer.from(data)).digest('hex');
    let new_data = new Uint8Array(Buffer.from(data));
    fs.writeFileSync(hashed + '.dat', new_data);
}


const main = async () => {
    await q1();
    for (let i = 1; i <= numInputs; i++) {
        await q2();
        await q3();
        await q4();
        await q5();
        var In = new Input (transactionID, index, sign_length, sign);
        Inputs.push(In);
    }
    await q6();
    for (let i = 1; i <= numOutputs; i++) {
        await q7();
        await q8();
        await q9();
        var out = new Output (coins, pubkey_len, pubkey);
        Outputs.push(out);
    }
    rl.close();
    console.log(Inputs);
    console.log(Outputs);
    var transaction = new Transaction (numInputs, Inputs, numOutputs, Outputs);
    transactionToByteArray(transaction);
}

main();