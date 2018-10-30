var request = require('request');
var token = require('./secrets.js');
console.log('Welcome to the GitHub Avatar Downloader!');
var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

function getRepoContributors(repoOwner, repoName, cb) {
    request(options, function(err, res, body) {
      cb(err, body);
    });
    // aquire data and convert into js object
}



function downloadImageByURL(url, filePath) {
    // ...

}
function onRetrieveWeather(error, response, body) {
    var data = JSON.parse(body);
};
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});