const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array, // we will be saving user's ids
    default: []
  },
  // Assuming you want to associate the post with a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
