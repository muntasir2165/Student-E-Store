module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        messageText: DataTypes.TEXT,
        otherUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: DataTypes.TEXT
        // ,
        // productId: {DataTypes.INTEGER,
        // 	allowNull: false
        // }
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
