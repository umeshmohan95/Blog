//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Publish your passions your way. Whether you'd like to share your knowledge, experiences or the latest news, create a unique and beautiful blog using Quacker's Web";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-umesh:root@cluster0.kre0s.mongodb.net/<dbname>?retryWrites=true&w=majority/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

// let posts = [];

app.get("/", function(req, res) {

  Post.find({}, function(err, posts){
    res.render("home",{
      startingContent: homeStartingContent,
      posts: posts
    })
  })





  // console.log("working");
  // res.render("home", {
  //   listHome: homeStartingContent,
  //   posts: posts
  // });
});


app.get("/about", function(req, res) {
  res.render("about", {
    listAbout: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    listContact: contactContent
  })
});



app.get("/compose", function(req, res) {
  res.render("compose")
});

app.post("/compose", function(req, res) {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  // console.log(postTitle);
  // console.log(postBody);

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
    res.redirect("/");
  });


  //// extra
  // const pInput = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // }
  //
  // posts.push(pInput);
  //// end
});

app.get("/posts/:postId", function(req, res) {
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;


  Post.findOne({_id: requestedPostId}, function(err, post){

     res.render("post", {

       title: post.title,

       content: post.content

     });

   });



  // posts.forEach(function(post) {
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

app.post("/post", function(req, res) {
  const pInput = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started Successfully");
});
