// TODO

var fs = require('fs');
var readline = require('readline');
var https = require('https');
var pToken = 'DZQXM4qq4GAAAAAAAAAAKCljAgSpvhfX6Uvm_7wJDe-W9yTK8CO9NXrvdF56ypRf';

//This function called when the user requests OAuthLink
function getAuthCode( res)
{
	var redirect = 'http://localhost:3000/oauth/db';
	var url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=bz0g559n6j5zjy1&response_type=code&redirect_uri=' + redirect;
	
	res.redirect(url);
	//return redirect to Oath with a redirect url of the app.
}

exports.getAuthCode = getAuthCode;



// Oath 2 authorize

// response_type required The grant type requested, either token or code.
// client_id required The app's key, found in the App Console.
// redirect_uri


function getClientSecret()
{
	return 'c6mue9fgquybvea';
	
}

//called when the Oath Page is redirected to our app's redirect url
function getAuthToken(code, res)
{
	var uid;
	var token;
	var email;

	var grant_type = 'authorization_code';
	var client_secret = getClientSecret();
	var client_id = 'bz0g559n6j5zjy1';
	
	//Make a post request to retrieve a token
	var options = {
		hostname: 'api.dropboxapi.com',
		path: '/1/oauth2/token?code=' + code + '&grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret,
		method: 'POST'
	};
	console.log('making post request');
	var req = https.request(options, function(subres) {
		console.log('STATUS: ' + subres.statusCode);
		console.log('HEADERS: ' + JSON.stringify(subres.headers));
		subres.setEncoding('utf8');
		//When the token is returned to us:
		subres.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
			token = JSON.parse(chunk).access_token;
			uid = JSON.parse(chunk).uid;
			//email = getEmail(token);
			//Attach the token to the response cookie
			var emailreq = https.get('https://api.dropboxapi.com/1/account/info?access_token='+token, onGet)
	  		.on('error', function(e) {
	    		console.log('problem with request: ' + e.message);
			});
			
			function onGet(subres) {
				subres.on('data', function(chunk) {
					console.log('data:' + chunk);
					var email = JSON.parse(chunk).email;
					
						console.log('hi, the token is '+token);
						res.cookie('dropbox'+email, token, {maxAge: 10000000000});
						//return a redirect to the home page
						var redirect = '127.0.0.1:3000/app/';
						res.redirect(redirect);
				});
				}
			
		 });
	});
	
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	console.log('hi');
	//req.write('test');
	console.log(req);
	req.end();
	
	
}

exports.getAuthToken = getAuthToken;

// function getEmail(token, res2)
// {
// 	emailreq = http.get('https://api.dropboxapi.com/1/account/info?access_token='+token, onGet)
// 	  .on('error', function(e) {
// 	    console.log('problem with request: ' + e.message);
// 	   });
	
// 	function onGet(res, res2) {
// 	  res.on('data', function(chunk) {
// 	    console.log('data:' + chunk);
// 		var email = JSON.parse(chunk).email;
		
		
// 		    res2.cookie('dropbox'+email, token, {maxAge: 10000000000});
// 			//return a redirect to the home page
// 			var redirect = 'localhost:3000/app/';
// 			res2.redirect(redirect);
// 	  });
// 	}
	
// }

function list(token, res)
{
	req = https.get('https://api.dropboxapi.com/1/metadata/auto/test?list=true&access_token='+pToken, onGet)
	  .on('error', function(e) {
	    console.log('problem with request: ' + e.message);
	   });
	
	function onGet(subres) {
	  subres.on('data', function(chunk) {
	    console.log('data:' + chunk);
		console.log('success');
		var obj = listify(chunk);
		
		res.send(JSON.stringify(obj));
	  });
	}
	
	
	
	




// var json = {
// 	"cats.txt" : {"type" : "txt",
// 			"size"  : "100",
// 			"date" : "26 September 2015"},
// 	"dogs.doc" : {"type" : "txt",
// 			"size"  : "100",
// 			"date" : "26 September 2015"},
// 	"birds" : {"type" : "folder",
			// "thumbnailPath" : "",
			// "iconPath" : "",
// 			"size"  : "200",
// 			"date" : "26 September 2015"},
// 	"frogs.png" : {"type" : "img",
// 			"size"  : "100",
// 		 	"date" : "26 September 2015"},
// 	"squirrels.jpg" : {"type" : "img",
// 			"size"  : "100",
// 			"date" : "26 September 2015"},
// 	"fish.gif" : {"type" : "other",
// 			"size"  : "200",
// 			"date" : "26 September 2015"}
// }








}


function listify(body)
{
	var newObject = {};
	var totalObj = JSON.parse(body);
	var contentsArr = totalObj.contents;
	for (var i = 0; i < contentsArr.length; i++)
	{
		var file = contentsArr[i];
		var size = file.size;
		var mime = file.mime_type;
		var indexOfSlash = (mime == undefined) ? 0 : mime.indexOf('/');
		var fileType = (mime == undefined) ? 0 : mime.substring(indexOfSlash+1);
		var indexOfName = file.path.lastIndexOf("/")+1;
		var fileName = file.path.substring(indexOfName);
		var date = file.modified;
		var isFolder = file.is_dir;
		var fileObj = {};
		fileObj.type = isFolder == "true" ? "Folder" : fileType;
		fileObj.size = size;
		fileObj.date = date;
		
		newObject[fileName] = fileObj;
	}
	
	return newObject;
	
	
}



function deletion(token, filename)
{
	
	console.log('This has not been  implemented yet.');

}


function download(token, filename)
{
	console.log('This has not been  implemented yet.');
	

}


function upload(token, filename, fileData)
{
	console.log('This has not been  implemented yet.');
	

}

exports.list = list;
exports.deleteFile = deletion;
exports.downloadFile = download;
exports.uploadFile = upload;

// res.redirect('your/404/path.html');


// req = http.get('http://nodejs.org/api', onGet)
//   .on('error', function(e) {
//     console.log('problem with request: ' + e.message);
//    });

// function onGet(res) {
//   res.on('data', function(chunk) {
//     console.log('data:' + chunk);
//   });
// }




// var options = {
//   hostname: 'www.hacktx.com',
//   port: 80,
//   path: '/upload',
//   method: 'POST'
// };

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write('data\n');
// req.write('data\n');
// req.end();


