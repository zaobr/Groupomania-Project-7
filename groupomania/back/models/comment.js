const { DataTypes } = require('sequelize');
const db = require('../db.config');


const Comment = db.define("comment", {
    text : {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;