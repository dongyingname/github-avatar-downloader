var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Authorization: token de8ed5bf7f29ef77e8cff7347802ef101607f3d9'
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
