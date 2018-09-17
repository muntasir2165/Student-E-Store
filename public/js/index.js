
//This method is called once the facebbok login dialog is completed
function handleLogin() {
  var FBID = "";
  FB.api("/me?fields=id,first_name,last_name,picture{url},email", function (
    response
  ) {
    //Once response comes in, the data is then sent to the server for user creation if user doesn't exist.
    console.log(response)
    $.ajax({
      url: "/login",
      method: "POST",
      data: response
    }).then(function (response) {
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
  window.location.replace("/feed");
}

function getFBID() {
  FB.getLoginStatus(function (response) {
    console.log(response.authResponse.userID)
    userFbidId = response.authResponse.userID
  })
}

// START OF MY JS FOR FRONT END ---ALL THE ABOVE IS JUST EXAMPLES

$(function () {


  // PAGE ELEMENTS
  var $newPost = $(".new-post");
  var $categoryItem = $(".category-item")
  var userFbidId 


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
  // event listener to post item 
  $newPost.on("submit", postItem);

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
    var navOptions = []
    x.forEach(element => {
      options.push(
        `<option value=${element.id}>${element.name}</option>`);
      navOptions.push(`<a class="dropdown-item category-dropdown" name="category" href="/category/${element.id}" data-val="${element.id}">${element.name}</a>`)
      // console.log(element.name)
      // console.log(element.id)
    });
    // can append the list of categories anywhere we need it
    $("#category").append(options)
    $categoryItem.append(navOptions);

  };
  // initializing get categories function 
  getCategories();
  // getFBID();

  // select and display category list 
  $categoryItem.on("click", ".category-dropdown", function (event) {

    console.log($(this).attr("data-val"))
    var categoryId = $(this).attr("data-val")

    $.get("/feed/"+categoryId)
  })

  $(".feed-page").on("click", function(event){
    event.preventDefault();
    $.get("/feed")
  })

});



