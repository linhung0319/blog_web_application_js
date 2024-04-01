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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})