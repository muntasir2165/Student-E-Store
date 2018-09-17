
//This method is called once the facebbok login dialog is completed
function handleLogin() {
  var FBID = "";
  FB.api("/me?fields=id,first_name,last_name,picture{url},email", function (
    response
  ) {
    //Once response comes in, the data is then sent to the server for user creation if user doesn't exist.
    $.ajax({
      url: "/login",
      method: "POST",
      data: response
    }).then(function(response) {
      if (response.auth === true) {
        console.log("login successful");
        document.cookie = `userId=${response.userId}`; //Here we store the user's id from the database
        fetchFeedPage();
      } else {
        console.log("something went wrong");
      }
    });
  })
}

function fetchFeedPage() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var token = response.authResponse.accessToken;
      document.cookie = `FBToken=${token}`; //Here we store the FB access token as a cookie
      window.location.replace("/feed");
    }
  });
}

function getFBID() {
  FB.getLoginStatus(function(response) {return(response.authResponse.userID)})
}

// START OF MY JS FOR FRONT END ---ALL THE ABOVE IS JUST EXAMPLES

$(function () {
  // PAGE ELEMENTS
  var $newPost = $(".new-post");


  // FUNCTION TO POST NEW ITEM 
  var postItem = function (event) {
    event.preventDefault();
    var newProduct = {
      productName: $("#product-name").val().trim(),
      categoryId: $("#category").val(),
      price: $("#price").val().trim(),
      quantity: $("#quantity").val().trim(),
      description: $("#description").val().trim()
    };
    //  ajax call to post item 
    console.log(newProduct)
    $.ajax("/post", {
      type: "POST",
      data: newProduct
    }).then(function () {
      console.log("created")
      location.reload();
    })


  };

  // FUNCTION TO GET CATEGORIES 
  var categories = [];
  function getCategories() {
    $.get("/api/categorylist", function (data) {
      categories = data
      // console.log(categories);
      displayCategory(categories)

    });

  };
  function displayCategory(x) {
    var options = []
    x.forEach(element => {
      options.push(
        `<option value=${element.id}>${element.name}</option>`)
      // console.log(element.name)
      // console.log(element.id)
    });
    // can append the list of categories anywhere we need it
    $("#category").append(options)

  }
  // initializing get categories function 
  getCategories();



  // Event listeners 


  $newPost.on("submit", postItem);

  //wishlist button on click event

  $(".wishlistButton").on("click", function (event) {

    // event.preventDefault();
    // console.log("works");
    var buttonId = {
      productId: $(this).attr("data-id"),
      userId: 2
    }


    $.ajax({
      type: "PUT",
      url: "/wishlist/",
      data: buttonId,

    });

  })
});



