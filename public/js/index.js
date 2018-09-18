$(document).ready(function () {
  searchProduct();
});

function searchProduct() {
  $("#search-product-submit-button").on("click", function (event) {
    event.preventDefault();
    if ($("#search-product").val()) {
      var searchProduct = $("#search-product").val().trim();
      // searchProductInDb(searchProduct);
      window.location.replace("/searchProduct/1/" + searchProduct);
    } else {
      alert("ERROR: Please type in a message before submitting the form.");
    }
  });
}

//This method is called once the facebbok login dialog is completed
function handleLogin() {
  var FBID = "";
  FB.api("/me?fields=id,first_name,last_name,picture.width(640),email", function (
    response
  ) {
    //Once response comes in, the data is then sent to the server for user creation if user doesn't exist.
    $.ajax({
      url: "/login",
      method: "POST",
      data: response
    }).then(function (response) {
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
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      var token = response.authResponse.accessToken;
      document.cookie = `FBToken=${token}`; //Here we store the FB access token as a cookie
      window.location.replace("/feed");
    }
  });
}

function getFBID() {
  FB.getLoginStatus(function (response) { return (response.authResponse.userID) })
}

// START OF MY JS FOR FRONT END ---ALL THE ABOVE IS JUST EXAMPLES

$(function () {
  // PAGE ELEMENTS
  var $newPost = $(".new-post");

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
      window.location.replace("/feed")
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
  var $categoryItem = $(".category-item")
  function displayCategory(x) {
    var options = []
    var navOptions = []
    x.forEach(element => {
      options.push(
        `<option value=${element.id}>${element.name}</option>`);
      navOptions.push(`<li><a  name="category" href="/category/${element.id}" data-val="${element.id}">${element.name}</a></li>`)
      // console.log(element.name)
      // console.log(element.id)
    });
    // can append the list of categories anywhere we need it
    // $("#category").append(options)
    $categoryItem.append(navOptions);

  };
  // initializing get categories function 
  getCategories();
  // getFBID();

  // select and display category list 
  $categoryItem.on("click", ".category-dropdown", function (event) {

    console.log($(this).attr("data-val"))
    var categoryId = $(this).attr("data-val")

    $.get("/feed/" + categoryId)
  })

  // $(".feed-page").on("click", function(event){
  //   // event.preventDefault();
  //   // $.get("/feed")
  // })

  // Event listeners 


  $newPost.on("submit", postItem);

  //Wishlist Button
  //   function cookie(cname){
  //     var name = cname + "=";
  //     var decodedCookie = decodeURIComponent(document.cookie);
  //     var ca = decodedCookie.split(';');
  //   }
  //   function getCookie(cname) {
  //     var name = cname + “=”;
  //     var decodedCookie = decodeURIComponent(document.cookie);
  //     var ca = decodedCookie.split(‘;’);
  //     for(var i = 0; i <ca.length; i++) {
  //         var c = ca[i];
  //         while (c.charAt(0) == ' ’) {
  //             c = c.substring(1);
  //         };
  //         if (c.indexOf(name) == 0) {
  //             return c.substring(name.length, c.length);
  //         };
  //     }
  //     return “”;
  //  }

  $(".wishlistButton").on("click", function (event) {

    // $(this).css({"background-image" : "linear-gradient(to right top, #0064fa, #009fff, #00c5e9, #00df87, #a8eb12)"});

    var buttonId = {
      productId: $(this).attr("data-id"),
    };


    $.ajax({
      type: "PUT",
      url: "/wishlist/",
      data: buttonId,

    }).then(function (results) {
      console.log("buttonId:" + results);
      addRemoveToWishlist();

    })

    // nav 
    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
      // open or close navbar
      $('#sidebar').toggleClass('active');
      // close dropdowns
      $('.collapse.in').toggleClass('in');
      // and also adjust aria-expanded attributes we use for the open/closed arrows
      // in our CSS
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

  });
  function addRemoveToWishlist() {
    $(document).on("click", ".wishlistButton", function () {
      if ($(".wishlistButton").css("background-color") === "rgb(0, 123, 255)") {
        $(".wishlistButton").css("background-color", "blue");
      } else {
        $(".wishlistButton").css("background-color", "lightseagreen");
      }
    });
  }


  // message button
  $('.message-seller').on('click', function (event) {
    event.preventDefault();

    var userId = Cookies.get('userId')

    // var messageData = {
    //     sellerId: $(this).attr("data-seller"),
    //     productId: $(this).attr("data-id")
    // };

    var sellerId = $(this).attr("data-seller");
    var productId = $(this).attr("data-id");

    // console.log(sellerId)
    // console.log(productId)
    // $.get(`/message/${userId}/${sellerId}/${productId}`)
    $.ajax({
      type: "GET",
      url: "/message/" + userId + "/" + sellerId + "/" + productId,
      data: {
        userId: userId,
        sellerId: sellerId
      }
    }).then(function (results) {
      location.assign(`/message/${userId}/${sellerId}/${productId}`)
      console.log(results)
    })


  });


});






