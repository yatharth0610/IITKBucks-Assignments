const crypto = require ('crypto');
const fs = require('fs');
const readline = require('readline');
const now = require('nano-time');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

class blockHeader {
    constructor (index, parent_hash, body_hash, target) {
        this.index = index;
        this.parent_hash = parent_hash;
        this.body_hash = body_hash;
        this.target = target;
    }
}

function toBytesInt32 (num) {
    arr = new ArrayBuffer(4); 
    view = new DataView(arr);
    view.setUint32(0, num, false); 
    return arr;
}

function toBytesInt64 (num){
    let arr = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
        arr[7-i] = parseInt(num%256n);
        num = num/256n;
    }
    return arr;
}

let index = 0;
let parent_hash = '';
let target = '';
let body_hash = '';
let timestamp = 0n;
let nonce = 0n;

const q1 = () => {
    return new Promise((resolve,reject) => {
        rl.question('Enter the index of the block: ', num => {
            index = Number(num);
            resolve();
        });
    });
}

const q2 = () => {
    return new Promise((resolve,reject) => {
        rl.question('Enter the hash of the parent block: ', str => {
            parent_hash = str;
            resolve();
        });
    });
}

const q3 = () => {
    return new Promise((resolve,reject) => {
        rl.question('Enter the target: ', str => {
            target = str;
            resolve();
        });
    });
}

const q4 = () => {
    return new Promise((resolve,reject) => {
        rl.question('Enter the path of the block body: ', path => {
            let data = fs.readFileSync(path);
            body_hash = crypto.createHash('sha256').update(data).digest('hex');
            resolve();
        });
    });
}

function mine_block(header) {
    let data = [];
    data = new Uint8Array(data.concat(toBytesInt32(header.index))[0]);
    data = [...data];
    let temp = new Uint8Array(Buffer.from(header.parent_hash, 'hex'));
    temp = [...temp];
    data = data.concat(temp);
    temp = new Uint8Array(Buffer.from(header.body_hash, 'hex'));
    temp = [...temp];
    data = data.concat(temp);
    temp = new Uint8Array(Buffer.from(header.target, 'hex'));
    temp = [...temp];
    data = data.concat(temp);
    time1 = BigInt(now());
    do {
        nonce++;
        timestamp = BigInt(now());
        let temp1 = [];
        temp1 = new Uint8Array(toBytesInt64(timestamp));
        temp1 = [...temp1];
        temp1 = data.concat(temp1);
        let temp2 = [];
        temp2 = new Uint8Array(toBytesInt64(nonce));
        temp2 = [...temp2];
        temp2 = temp1.concat(temp2);
        hashed = crypto.createHash('sha256').update(Buffer.from(temp2)).digest('hex');
        if (nonce%1000000n == 0) console.log(nonce, hashed);
    } while (hashed >= target);
    console.log("Found hash: ", hashed);
    time2 = BigInt(now());
    header.timestamp = timestamp;
    header.nonce = nonce;
    console.log(header);
    console.log("Time taken : ", (time2-time1)/(1000000000n));
}

const main = async() => {
    await q1();
    await q2();
    await q3();
    await q4();
    rl.close();
    let header = new blockHeader(index, parent_hash, body_hash, target);
    mine_block(header);
}

main();
