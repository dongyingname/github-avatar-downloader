var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');
var data = {};
function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + token.GITHUB_TOKEN
        }
      };
    request(options, function(err, res, body) {
      data = JSON.parse(body);
      //console.log(data);
      data.forEach(function(input){
        var img = input.avatar_url;
        var path = './avatars/' + input.login;
        //console.log(img);
        cb(img, input, path);
      })
    });
    
    // aquire data and convert into js object
    //return data;
}

function downloadImageByURL(url, input, filePath) {
    // ...
    request.get(url)
    .on('error',function(err){
        throw err;
    })
    .on('end', function(){ console.log('downloading picture of' + input.login +  'into ' + filePath) })
    .pipe(fs.createWriteStream(filePath))
    
    .on('finish', function(){ console.log('Finished downloading picture of' + input.login +  'into ' + filePath) })
}   
// function onRetrieveWeather(error, response, body) {
//     var data = JSON.parse(body);
// };
getRepoContributors("jquery", "jquery", downloadImageByURL);