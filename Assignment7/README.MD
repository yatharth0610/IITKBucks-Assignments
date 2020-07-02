# How to run :

```
nodemon app.js or node app.js
```

This runs the server that will accept a string from post request at the route **/start** in json-format and starts mining it in another thread *worker.js* and returns the status and result of mining via a get request at the route **/result** in json-format. 