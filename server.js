var serveStatic = require('serve-static');
var compression = require('compression');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(serveStatic('dist/', {'index': ['index.html']}));
app.listen(process.env.PORT || 5000);

console.log("LibedMe listening on port %d", process.env.PORT || 5000);
