import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = {};

app.use(bodyParser.urlencoded({ extend: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
})

app.get("/create-post", (req, res) => {
    res.render("create_post.ejs");
})

app.post("/create-post", (req, res) => {
    const {title, content} = req.body;
    const postId = Date.now().toString();
    posts[postId] = {title, content};
    res.redirect('/')
})

app.get("/update-post/:postId", (req, res) => {
    const {postId} = req.params;
    if (!posts[postId]) {
        return res.status(404).send("Post not found");
    }
    res.render("update_post.ejs", {
        postId: postId,
        posts: posts,
    });
})

app.post("/update-post/:postId", (req, res) => {
    const {postId} = req.params;
    const {title, content} = req.body;
    posts[postId] = {title, content};
    res.redirect('/')
})

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})