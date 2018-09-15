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

  app.get("/profile", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("profile", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/feed", function(req, res) {
    db.Product.findAll({}).then(function(dbProduct) {
      res.render("feed", {
        product: dbProduct
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
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};