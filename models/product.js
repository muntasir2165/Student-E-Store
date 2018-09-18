module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    photoUrl: {
      type: DataTypes.TEXT,
      defaultValue: "https://via.placeholder.com/140x100"
    },
    notes: DataTypes.TEXT
  });

  Product.associate = function(models) {
    // a product should belong to a user (the seller) and a category
    // a product can't be created without a user and a category due
    // to the foreign key constraint
    Product.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Product;
};
