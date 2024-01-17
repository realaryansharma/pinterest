var express = require('express');
var router = express.Router();

const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.get("/profile", isLoggedIn, function(req, res) {
  res.send("profile");
});

router.post("/register", function(req, res) {
   const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullame: req.body.fullname
   });

   userModel.register(userData, req.body.password)
   .then(function() {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      });
   });  

});

// router.get('/login', passport.authenticate("local", {
//   successRedirect: "/profile",
//   failureRedirect: "/"
// }), function(req, res) {
   
// });

router.get("/logout", function(req, res) {
  
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

});

function isLoggedIn(req, res, next) {

  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");

}
// router.get("/createuser", async function(req, res) {
  
//   let createduser = await userModel.create({
//     username: "realaryansharma",
//     password: "Welcome123@",
//     posts: [],
//     email: "talktoaryansharma@gmail.com",
//     fullname: "Aryan Sharma"
//   });

//   res.send(createduser);

// });

// router.get("/createpost", async function(req, res) {
  
//   let createdpost = await postModel.create({
//     text: "This is my first post",
//     user: "65a622947c047aefe41b2152",
//   });

//   user.posts.push(createdpost._id);
//   await user.save();

//   res.send("Done!");

// });

// router.get("/alluserpost", async function(req, res) {

//   let user = await userModel
//   .findOne({_id: "65a622947c047aefe41b2152"})
//   .populate("posts");

//   res.send(user);

// });

module.exports = router;
