//grab my input <owner> <repo>
var mine = process.argv.splice(2);

//get the modules and initiate the porject
var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var data = {}; //used for obtaining html that is converted into a node object
console.log('Welcome to the GitHub Avatar Downloader!');

//get started
//convert user input into object for the function
var owner = mine[0];
var repo = mine[1];
var urlInfo = {
	url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
	headers: {
		'User-Agent': 'request',
		'Authorization': 'token ' + token.GITHUB_TOKEN
	}
}

//function that convert internet data into node object
function getRepoContributors(options, cb) {
	request(options, function (err, res, body) {
		data = JSON.parse(body); //got the object with names and urls

		data.forEach(function (input) {
			var img = input.avatar_url;
			var path = './avatars/' + input.login;
			cb(img, input, path);
		})
	});
}

//call back function. Added another parameter input which is the name of the contributer
//consolelog out the status of downloads and download the images into respective folders
function downloadImageByURL(url, input, filePath) {
	// ...
	request.get(url)
		.on('error', function (err) {
			throw err;
		})
		//start to download
		.on('end', function () {
			console.log('Downloading picture of' + input.login + 'into ' + filePath)
		})
		.pipe(fs.createWriteStream(filePath))
		//finished downloading
		.on('finish', function () {
			console.log('Finished downloading picture of' + input.login + 'into ' + filePath)
		})
}

//execute the program
getRepoContributors(urlInfo, downloadImageByURL);