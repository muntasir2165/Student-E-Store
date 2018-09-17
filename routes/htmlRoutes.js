var db = require("../models");
var auth = require("../utility/facebook");


module.exports = function(app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/profile", function(req, res) {
    auth(req.cookies.FBToken, function(response) {
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

  app.get("/feed", function(req, res) {
    auth(req.cookies.FBToken, function(response) {
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
          res.render("wishlist", {
            wishlist: dbWishlist
          });
        });
    });
  });


  app.get("/message/:UserId/:otherUserId/:productId", function (req, res) {
    db.Message.findAll({
      where: {
        UserId: req.params.UserId,
        otherUserId: req.params.otherUserId,
        productId: req.params.productId
        },
        order: [
            ["createdAt", "ASC"]
        ]
      }
    ).then(function(dbMessageFromUser) {
        db.Message.findAll({
          where: {
            otherUserId: req.params.UserId,
            UserId: req.params.otherUserId,
            productId: req.params.productId
            },
            order: [
                ["createdAt", "ASC"]
            ]
          }
        ).then(function(dbMessageFromOtherUser) {
          db.Product.findOne({
            where: {
              id: req.params.productId
            }
          }).then(function (dbProduct) {
            // console.log("#####################################");
            // console.log(JSON.stringify(dbMessageFromUser));
            // console.log(dbMessageFromUser.length);
            // console.log("#####################################");
            // console.log(dbMessageFromUser.length + dbMessageFromOtherUser.length);
            // console.log("#####################################");
            // console.log(JSON.stringify(dbMessageFromOtherUser));
            // console.log(dbMessageFromOtherUser.length);
            // console.log("#####################################");
            // console.log(JSON.stringify(dbProduct));
              res.render("message", {
                messageFromUser: dbMessageFromUser,
                dbMessageFromOtherUser: dbMessageFromOtherUser,
                product: dbProduct,
                totalNumberOfMessages: dbMessageFromUser.length + dbMessageFromOtherUser.length
              });
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
