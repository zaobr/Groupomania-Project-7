const { DataTypes } = require("sequelize");
const db = require("../db.config");

const User = db.define("user", {
  lastname: {
    type: DataTypes.STRING(30),
    defaultValue: "",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstname: {
    type: DataTypes.STRING(30),
    defaultValue: "",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING(30),
    defaultValue: "",
    allowNull: false,
    unique: "email",
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  media: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = User;
