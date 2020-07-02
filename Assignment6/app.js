const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use (bodyParser.urlencoded({extended: true}));
app.use (bodyParser.json());

let map = {};
let peers = ["https://98f70a970251.ngrok.io", "http://2382d24326e9.ngrok.io", "http://0b7c83529168.ngrok.io"];

app.post ('/add', function(req, res){
    const key = req.body.key;
    const value = req.body.value;
    if (!(key in map)) {
        map[parseInt(key)] = value;
        peers.forEach(function (url) {
            axios.post (url + '/add', { 
                key : key, value : value}, { headers : {key : value}, params : { key : value}}) 
                .then((res) => {
                    console.log('sent ', key, ": ", value, "to url: ", url);
                })
                .catch((err) => {
                    //console.log(err);
                })
        })
        res.send("Request accepted"); 
        console.log(map);
        console.log("set ",  key, ": ", value);
    }
    else {
        res.send("Key already exists");
    }
})

app.get ('/list', function(req, res){
    console.log(map);
    res.json(map);
})

app.listen (8000, function() {
    console.log("Server started on port 8000");
})