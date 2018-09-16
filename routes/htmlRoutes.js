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
        db.Example.findAll({}).then(function(dbExamples) {
          res.render("profile", {
            msg: "Welcome!",
            examples: dbExamples
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

    // var category = db.category.findAll({}).then(function(dbCategory){
    //  return dbCategory
    // });

    // renderPage(products);
    // renderPage(dbProduct)

    // res.render("feed", {
    //   product:productData
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
