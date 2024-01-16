var express = require('express');
var router = express.Router();

const userModel = require("./users");
const postModel = require("./posts");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createuser", async function(req, res) {
  
  let createduser = await userModel.create({
    username: "realaryansharma",
    password: "Welcome123@",
    posts: [],
    email: "talktoaryansharma@gmail.com",
    fullname: "Aryan Sharma"
  });

  res.send(createduser);

});

router.get("/createpost", async function(req, res) {
  
  let createdpost = await postModel.create({
    text: "This is my first post",
    user: "65a622947c047aefe41b2152",
  });

  user.posts.push(createdpost._id);
  await user.save();

  res.send("Done!");

});

router.get("/alluserpost", async function(req, res) {

  let user = await userModel
  .findOne({_id: "65a622947c047aefe41b2152"})
  .populate("posts");

  res.send(user);

});

module.exports = router;
