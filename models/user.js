module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        photoUrl: DataTypes.TEXT,
        wishList: DataTypes.TEXT,
        purchaseList: DataTypes.TEXT,
        notes: DataTypes.TEXT
   });

    User.associate = function(models) {
        // associating a user (the seller) with products
        // When a seller is deleted, also delete any associated
        // products they are selling
        User.hasMany(models.Product, {
            onDelete: "cascade"
        });
        
        // associating a user with any back and forth messages
        // from another user (for example: prospective buyer-seller)
        // communication
        User.hasMany(models.Message, {
            // onDelete: "cascade"
        });
    };

    return User;
};
