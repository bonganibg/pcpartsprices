const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/price-checker'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname+'/dist/price-checker/index.html'));
});

const port = (process.env.PORT || 8080);

app.set("port", port);
app.listen(port);
