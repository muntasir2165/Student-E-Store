module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        messageText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        otherUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
        	allowNull: false
        },
        notes: DataTypes.TEXT
    });

    Message.associate = function(models) {
        // a message should belong to a user (buyer or seller)
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};
