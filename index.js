import express from "express";

const app = express();
const port = 3000;
let id = 1;
let posts = [];
let postsIndexes = {};
let postId;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    postId = null;
    if (postsIndexes.length != 0) {
        res.render("posts.ejs", {posts: posts});
    }
    else {
        res.render("posts.ejs");
    }
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit-create", (req, res) => {
    let post = {
        postId: `post-${id}`,
        title: req.body.postTitle,
        postBody: req.body.postBody
    }
    posts.push(post);
    postsIndexes[`post-${id++}`] = post;
    res.redirect("/");
});

app.get("/edit-post", (req, res) => {
    res.render("update.ejs", {postId: postId, posts: postsIndexes});
});

app.get("/post-view/:postId", (req, res) => {
    postId = req.params.postId;
    res.render("post-view.ejs", {postTitle: postsIndexes[postId].title, postBody: postsIndexes[postId].postBody});
});

app.get("/posts", (req, res) => {
    res.redirect("/");
});

app.get("/submit-create", (req, res) => {
    res.redirect("/");
});

app.post("/submit-update", (req, res) => {
    // posts.splice(postId - 1, 1);
    postsIndexes[postId].title = req.body.postTitle;
    postsIndexes[postId].postBody = req.body.postBody;
    res.redirect("/");
});

app.get("/delete-post", (req, res) => {
    console.log(`deleting post ${postId}`);
    posts.splice(parseInt(postId.match(/\d+/)[0]) - 1, 1);
    delete postsIndexes[postId];
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});