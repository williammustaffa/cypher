var express = require('express'), app = express();

app.use("/js", express.static(__dirname + '/js'));
app.use("/resources", express.static(__dirname + '/resources'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;
var server = app.listen( port );
console.log('Server started at %s', server.address().port);
