// JavaScript source code
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://guncontrol.herokuapp.com/getAllTweets', true);

request.onload = function () {
    // Begin accessing JSON data here
    var TweetsJson = JSON.parse(this.response);

    TweetsJson.forEach(tweet => {
        // Log each Tweet's Location
        console.log(tweet.location);
    });
}

// Send request
request.send();
