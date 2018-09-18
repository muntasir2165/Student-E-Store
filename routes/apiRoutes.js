var db = require("../models");
var auth = require("../utility/facebook");
var Filter = require('bad-words');
var filter = new Filter();

module.exports = function(app) {

//UPDATE users 'wishlist column'

  app.put("/wishlist/", function(req,res){
    console.log(req.body);
  
    db.User.findOne({
      where: {
        id: req.cookies.userId
      }
    })
      .then(function(dbPost) {
        console.log(JSON.stringify(dbPost));
        var wishList = JSON.parse(dbPost.wishList);

        wishList.push(parseInt(req.body.productId));
        console.log(wishList);
  
        db.User.update({
          wishList: JSON.stringify(wishList)
        },{
          where: {
            id: req.cookies.userId
          }
        }).then(function(results){
          console.log(results);
        })
      });

  })

  // Create a new example
  app.post("/login", function(req, res) {
    //If user doesn't already exist, create them using facebook data sent from client
    db.User.findOrCreate({
      where: { userId: req.body.id },
      defaults: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        photoUrl: req.body['picture[data][url]'],
        wishList: "[]",
        purchaseList: "[]"
      }}).spread((user,created) => {
        console.log(user.get({
          plain:true
        }))
        res.json({
          auth:true,
          userId: user.id
        })
      });
  });

  app.get("/api/feed", function(req, res){
    db.Product.findAll({}).then(function(dbProduct){
    res.json(dbProduct); 
    })
  });


  app.get("/api/categorylist", function(req, res){
    db.Category.findAll({}).then(function(dbCategory){
    res.json(dbCategory);
    });
  })

  app.post("/post", function (req, res) {
    db.Product.create({
      name: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      CategoryId: req.body.categoryId,
      UserId: req.cookies.userId
    }).then(function(response) {
      res.json(true)
    })
  })
  
  app.post("/message", function (req, res) {
    db.Message.create({
      messageText: filter.clean(req.body.messageText),
      UserId: req.body.UserId,
      otherUserId: req.body.otherUserId,
      productId: req.body.productId 
    }).then(function(dbMessageFromUser) {
      res.status(200).end();
      // res.json({ id: result.insertId });
    });
  });
 

  app.post("/message/new", function (req, res) {
    db.Message.findAll({
      where: {
        UserId: req.body.UserId,
        otherUserId: req.body.otherUserId,
        productId: req.body.productId
        },
      order: [
            ["createdAt", "ASC"]
        ]
      }
    ).then(function(dbMessageFromUser) {
        db.Message.findAll({
          where: {
            UserId: req.body.otherUserId,
            otherUserId: req.body.UserId,
            productId: req.body.productId
            },
            order: [
                ["createdAt", "ASC"]
            ]
          }
        ).then(function(dbMessageFromOtherUser) {
          // console.log(dbMessageFromUser.length);
          // console.log(dbMessageFromOtherUser.length);
          res.json({totalNumberOfMessages: dbMessageFromUser.length + dbMessageFromOtherUser.length});
        });
    });
  });

};
