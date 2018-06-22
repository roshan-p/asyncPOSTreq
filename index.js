// YOU CAN SEE RESULT IN CONSOLE AFTER RUN COMMAND ' node index.js '
var express = require('express')
var app = express()
var async = require('async');
var http = require('http');
var fs = require("fs");
app.listen(2000)


var postData = fs.readFileSync("postData.json");
var jsonContent = JSON.parse(postData);
console.log(jsonContent)
async.each(jsonContent.request, function(data, callback){

	  var options = {
		hostname: 'test.interaktiv.sg',
		port    : '80',
		path    : '/robot-test',
		method  : 'POST',
		headers : {
			'Content-Type': 'application/json',
		  "email":"roshan007191@gmail.com",
			'Authorization': 'test-robot-interaktiv'
		}
	  };
	  postReq = http.request(options, function (res) {
	  //	console.log(res)
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ', chunk);
		});
		res.on('end', function () {
			callback();
		});
	  });
	  postReq.on('error', function(e) {
		  console.log('Request error: ' + e.message);
	  });
	  postReq.write(data.toString());
	  postReq.end();
	  console.log('Request '+data+' is success to make a reqeust.')
	}, function(err){	

	});
