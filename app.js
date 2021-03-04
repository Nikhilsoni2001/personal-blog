const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Apple wants a weekend or expensive dui want to decorate. Which is always the creator nor the duration of her life. Carrots carrots just been running a lot. Product lived in this. Financing yeast rice vegetarian or clinical portal. That they are not members, nor members of the Donec ultrices tincidunt arcu. A lot of television targeted at the undergraduate nutrition. Of life, and the mountains shall be born, ultricies quis, congue in magnis dis parturient. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The founder of basketball and football propaganda graduated drink at the arc. Performance skirt smile at any hate for hate vulputate. Running a lot of television targeted at the undergraduate nutrition.";
const aboutContent = "Textile manufacturing refinancing is beating. Textile manufacturing dictumst the kids elit. There diameter and boat manufacturing lorem. Consectetur adipiscing elit sagittis purus each one it is. But the price they want, but the smile Vulputate soccer massage. In some salad largest ecological. Makeup is always the laughter from her, Whosoever shall not nibh sed ac hendrerit gravida. Westinghouse peanut sauce or carrots mass of temperature. For the arrows of life, so that the earth element. In basketball largest peanut running Massa developers worth it.";
const contactContent = "Thermal deductible until the price vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Inspections Ut et drink recipes. Minneapolis developer undergraduate homework et. Laughter pull undergraduate at iaculis in the region. Nor do some shooting movies malesuada bibendum sapien arcu vitae. Recipe sometimes varied mainstream real estate. But now targeted propaganda opportunities. Sometimes put lorem ipsum carrots undergraduate tomato soup. The cushion element of the whole, they shall neither. Basketball was pregnant dark to invest clinical zero. So that the disease in the aliquam sem mauris fringilla tincidunt. Set the temperature to photography always pull for free.";

const app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb+srv://NikhilSoni:Nikhil@123@cluster0.klq2f.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
    title: String,
    content: String
}

const Post = mongoose.model("Post", postSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    Post.find({}, function(err, posts) {
        res.render("home", {homeContent: homeStartingContent, posts: posts});
    })
});

app.get("/about", function(req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.post
    });
    post.save(err => {
        if (!err)
        res.redirect("/");
    });
});

app.get("/posts/:postId", function(req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId}, function(err, post) {
        res.render("post", {title: post.title, content: post.content})
    })
    const requestedTitle = _.lowerCase(req.params.postName);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});