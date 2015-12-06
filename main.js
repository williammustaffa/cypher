var express = require('express'), app = express();

app.use("/dist", express.static(__dirname + '/dist'));
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;
var server = app.listen( port );
console.log('Server started at %s', server.address().port);
