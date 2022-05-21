const { DataTypes } = require('sequelize');
const db = require('../db.config');

const Like = db.define("like", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Like;