module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: DataTypes.TEXT
  });

  Category.associate = function(models) {
    // associating a category with products
    // When a category is deleted, also delete any product
    // that belongs to that category
    Category.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };

  return Category;
};
