var db = require("../models");
var auth = require("../utility/facebook");


module.exports = function(app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index")
  });

  app.get("/profile/:token", function(req, res) {
    auth(req.params.token, function(response) {
      if (response.is_valid === true) {
        db.User.findOne({
          where: {userId: response.user_id}
        }).then(function(userData) {
          res.render("profile", {
            userData: userData
          });
        });
      } else {
        res.render("index");
      }
    });
  });

  app.get("/feed/:token", function(req, res) {
    auth(req.params.token, function(response) {
      if (response.is_valid === true) {
        db.Product.findAll({}).then(function(dbProduct) {
          res.render("feed", {
            product: dbProduct,
            authToken: req.params.token
          });
        });
      } else {
        res.render("index");
      }
    });
  });

    // var category = db.category.findAll({}).then(function(dbCategory){
    //  return dbCategory
    // });

  //HTML route for wishlist.handlebars page
  app.get("/wishlist/:userId", function (req, res) {
    console.log("##########");
    var userId = req.params.userId;
    db.User.findOne({
      where: {id: userId}
      }
    ).then(function(dbUser) {
      var wishList = JSON.parse(dbUser.wishList);
      db.Product.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: wishList
          }
        }
      }).then(function (dbWishlist) {
        
        console.log(JSON.stringify(dbWishlist));
        console.log("##########");
        res.render("wishlist", {
          wishlist: dbWishlist
        });
      });
    });
  });





  // var category = db.category.findAll({}).then(function(dbCategory){
  //  return dbCategory
  // });

  // renderPage(products);
  // renderPage(dbProduct)

  // res.render("feed", {
  //   product:productData
  // });

    // res.render("feed", {
    //   product:productData
    // });
  

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
