const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/newapp");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  dp: String, // Assuming a URL to the user's profile picture
  email: {
    type: String,
    unique: true,
    required: true
  },
  fullname: String
});

// Add passport-local-mongoose for simplifying user authentication
// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
