const { DataTypes } = require('sequelize');
const db = require('../db.config');


const Post = db.define("post", {
    title : {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    text : {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
    },
    media : {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        name: 'createdAt',
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        name: 'updatedAt',
        field: 'updated_at'
    }
},
{
    timestamps: false
});

module.exports = Post;