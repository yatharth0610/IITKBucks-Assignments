const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Worker } = require('worker_threads');
 
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

let mined = false;
let nonce = -1;

const worker = new Worker('./worker.js');

app.post ('/start', function(req, res) {
    let str = req.body.data;
    worker.postMessage({data : str});
    res.sendStatus(200);
});

worker.on('message', message => {
    nonce = message.nonce;
    mined = true;
});

app.get('/result', function(req, res) {
    if (mined === true) {
        let data = {"result" : "found", "nonce" : nonce};
        res.json(data);
    } 
    else {
        let data = {"result" : "searching", "nonce" : nonce};
        res.json(data);
    }
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

