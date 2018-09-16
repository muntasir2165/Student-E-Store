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
    }).then(function (dbListings) {
      res.render("listings", {
        listings: dbListings
      });
    });
  });

  //To get the category name
  app.get("/listings/:userId", function (req, res) {
    var userId = req.params.userId;
    db.User.findOne({
      where: { id: userId }
    }
    ).then(function(dbUser){
      db.Product.findAll({
        where: {categoryId: CategoryId}
      }).then(function(dbCategory){
        db.Category.findOne({
          where: { categoryId: id }
        }).then(function(categoryName){
          res.render("listings", {
            categoryName: name
        })
      })
    })
  })
})
  // db.Product.findAll({
  //       where: { categoryId: CategoryId }
  //     }).then(function (dbCategory) {
  //       // console.log(dbCategory);
  //       db.Category.findAll({
  //       }).then(function (categoryName) {
  //         })
  //       });
  //     });
  //   });







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