var express = require('express');
var router = express.Router();

const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const upload = require("./multer");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("login");
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get("/login", function(req, res, next) {
  res.render("login", {error: req.flash("error")});
});

router.get('/profile', isLoggedIn, async function(req, res) {

  const user = await userModel.findOne({
    username: req.session.passport.user 
  })
  .populate("posts"); 

  console.log(user.username);

  res.render("profile", {user});
});

router.get("/feed", function(req, res) {
  res.render("feed");
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

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res) {
  console.log(req.body.email);
  console.log(req.body.password);

});

router.get("/logout", function(req, res) {
  
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });

});

// Handle File Upload
router.post("/upload", isLoggedIn, upload.single("file"), async (req, res) => {
  if(!req.file) {
    return res.status(404).send('No field were uploaded.');
  }

  const user = await userModel.findOne({ username: req.session.passport.user });

  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.imagecaption,
    user: user._id
  });

  console.log(post._id);  

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // Redirect to the login page if not authenticated
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
