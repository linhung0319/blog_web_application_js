import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = {
    "1": {
        "title": "Protests",
        "content": "A great idea for photo essays for students is to shoot the protest to show its power. You can capture people with signs and banners to demonstrate what they are standing for. Besides, you can learn how to capture moving subjects. Use the best example of photo essay and don’t forget about angles, composition, and framing."
    },
    "2":{
        "title": "Local Event",
        "content": "Whether you are a resident of a large city or a small town, you can find an opportunity to visit a local event, like a marathon or a festival. This is a nice chance to follow modern photography trends and bring photo essay ideas to life."
    }
};

app.use(express.static("public"));
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
    res.redirect('/');
})

app.get("/delete-post/:postId", (req, res) => {
    const {postId} = req.params;
    delete posts[postId];
    res.redirect('/');
})

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})