const User = require('./User');
const Post = require('./Post');

//Foreign keys used to join the two tables together - user table containing username and password, and post table containing posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };