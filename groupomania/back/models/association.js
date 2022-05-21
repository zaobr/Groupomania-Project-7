const User = require('./user')
const Post = require('./post')
const Like = require('./like')
const Comment = require('./comment')

const setAssociations = function() {
   User.hasMany(Post, {foreignKey: "user_id"});
   User.hasMany(Comment, {foreignKey: "user_id"});
   User.hasMany(Like, {foreignKey: "user_id"});

   Post.belongsTo(User, {foreignKey: "user_id"});
   Post.hasMany(Like, {foreignKey: "post_id"});
   Post.hasMany(Comment, {foreignKey: "post_id"});

   Comment.belongsTo(User, {foreignKey: "user_id"});
   Comment.belongsTo(Post, {foreignKey: "post_id"});

   Like.belongsTo(User, {foreignKey: "user_id"});
   Like.belongsTo(Post, {foreignKey: "post_id"});
}

module.exports = setAssociations;