// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
  res.render('index.ejs');
})

app.get('/bonjour', function(req, res) {
  res.render('index.ejs');
})

.use(function(req, res, next){
    res.redirect('/');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});