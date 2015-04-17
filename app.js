var request = require('request');
var express = require('express');
var app = express();

var baseUrl = "https://campus.tum.de/tumonline/wbservicesbasic.";
var appName = "TUMonline-Noten-CSV-Export";

var port = 8080;
if(process.argv.length > 2) {
	port = parseInt(process.argv[2],10);
}
//request.debug = true;

app.get('/requestToken/:pUsername', function (req, res) {
	console.log(req.params);
	request.get({
		url : baseUrl + "requestToken",
		qs : {
			pUsername : req.params.pUsername,
			pTokenName : appName
		}
	}, function(tumError, tumResponse, tumBody) {
		res.send(tumBody);
	});
});

app.get('/isTokenConfirmed/:pToken', function (req, res) {
	request.get({
		url : baseUrl + "isTokenConfirmed",
		qs : {
			pToken : req.params.pToken
		}
	}, function(tumError, tumResponse, tumBody) {
		res.send(tumBody);
	});
});

app.get('/getNoten/:pToken', function (req, res) {
 	request.get({
		url : baseUrl + "noten",
		qs : {
			pToken : req.params.pToken
		}
	}, function(tumError, tumResponse, tumBody) {
		res.send(tumBody);
	});
});
app.use(express.static('www'));

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});