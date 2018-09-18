var FB = require('fb');

//This code retrieves and sets the facebook access token for our app, allowing us to make calls
//to the facebook graph API on the server
FB.api('oauth/access_token', {
    client_id: '318450952247545',
    client_secret: 'c8c9d38a8fd05a1cd56816fb5deb1a1c',
    grant_type: 'client_credentials'
  }, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    FB.setAccessToken(res.access_token);
});

function validUserRequest(access_token, callback) {
    FB.api(`/debug_token?input_token=${access_token}`, function(response) {
        return callback(response.data)
    });
}

module.exports = validUserRequest

