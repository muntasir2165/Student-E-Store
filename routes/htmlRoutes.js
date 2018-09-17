var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/profile", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("profile", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/feed", function (req, res) {


    db.Product.findAll({}).then(function (dbProduct) {
      res.render("feed", {
        product: dbProduct
      });
    });
  });

  //HTML Wishlist Route
  app.get("/wishlist/:userId", function (req, res) {
    console.log("##########");
    var userId = req.params.userId;
    db.User.findOne({
      where: { id: userId }
    }
    ).then(function (dbUser) {
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

  //HTML My Listings Route
  app.get("/listings/:userId", function (req, res) {
    db.Product.findAll({
      where: { userId: req.params.userId },
      include:[db.Category]
    }).then(function (dbListings) {
      // console.log(dbListings);
      console.log(JSON.stringify(dbListings));
      res.render("listings", {
        listings: dbListings
        
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
    app.get("*", function (req, res) {
      res.render("404");
    });
  };