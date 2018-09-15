
//This method is called once the facebbok login dialog is completed
function handleLogin() {
  var FBID = "";
  FB.api("/me?fields=id,first_name,last_name,picture{url},email", function(
    response
  ) {
    //Once response comes in, the data is then sent to the server for user creation if user doesn't exist.
    console.log(response)
    $.ajax({
      url: "/login",
      method: "POST",
      data: response
    }).then(function(response) {
      if (response === true) {
        console.log("login successful");
        fetchFeedPage();
      } else {
        console.log("something went wrong");
      }
    });
  })
}

function fetchFeedPage() {
  window.location.replace("/main");
}

function getFBID() {
  FB.getAuthResponse(function(response) {
    return response.userID;
  })
}
