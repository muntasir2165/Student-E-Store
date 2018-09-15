var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/feed", function(req, res){
    
    db.Product.findAll({}).then(function(dbProduct){
    res.json(dbProduct)
  
    })
  });

  app.get("/api/categorylist", function(req, res){
    db.Category.findAll({}).then(function(dbCategory){
    res.json(dbCategory)
    });
  })


  app.post("/post", function (req, res) {
    console.log(req.body)
    db.Product.create({
      name: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      CategoryId: req.body.categoryId,
      UserId: 2
    })

  })
};
