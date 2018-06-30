var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
// Application front end
app.use(express.static('public'));

app.listen(port);
console.log('Registration and Login happens on port '+port);