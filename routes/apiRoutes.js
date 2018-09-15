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

  // Create a new example
  app.post("/login", function(req, res) {
    //If user doesn't already exist, create them using facebook data sent from client
    db.User.findOrCreate({
      where: { userId: req.body.id },
      defaults: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        photoUrl: req.body['picture[data][url]']
      }}).spread((user,created) => {
        console.log(user.get({
          plain:true
        }))
        res.json(true);
      })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
