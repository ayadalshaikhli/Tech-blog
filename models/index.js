const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'userid',
});

Post.hasMany(Comment, {
  foreignKey: 'postid',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userid',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'postid',
});

module.exports = { User, Comment, Post };
