const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use (bodyParser.urlencoded({extended: true}));
app.use (bodyParser.json());

let map = {};
let peers = ["https://4f680547.ngrok.io", "https://93462530.ngrok.io"];

app.post ('/add', function(req, res){
    const key = req.body.key;
    const value = req.body.value;
    map[key] = value;
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
})

app.get ('/list', function(req, res){
    console.log(map);
    res.json(map);
})

app.listen (8080, function() {
    console.log("Server started on port 8080");
})