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

  });


  app.get("/feed/:categoryid", function(req,res){
    // console.log(req.params.categoryid)
    db.Product.findOne({
      where:{
        CategoryId:req.params.categoryid
      }
    }).then(function(dbProduct){
      console.log(JSON.stringify(dbProduct))
     res.render("category", {
       product: dbProduct
     })
     
    })

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};