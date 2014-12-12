var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

var httpProxy = require('http-proxy');
 
app.use(morgan('dev'));
app.use(gzippo.staticGzip(__dirname + "/dist"));

var asrProxy = httpProxy.createProxyServer({ target: 'https://apps.asr.umn.edu:443'});

app.get('/liberal_education_courses/courses.json', function (req, res) {
	asrProxy.web(req, res);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/dist/index.html");
});

app.listen(process.env.PORT || 5000);
