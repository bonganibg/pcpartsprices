const http = require('http');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.static('./dist/price-checker'));

app.get('/*', function(req, res){
  res.sendFile('index.html', {root: 'dist/price-checker/'})
});

const port = (process.env.PORT || 8080);

console.log("server is running")
app.set("port", port);
app.listen(port);
