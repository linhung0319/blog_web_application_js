import express from "express";
import bodyParser from "body-parser";
import DOMPurify from 'dompurify';
import { JSDOM } from "jsdom";

const app = express();
const port = 3000;

const window = new JSDOM('').window;
const purify = DOMPurify(window);

let posts = {
    "1": {
        "title": "Protests",
        "img_url": "https://compote.slate.com/images/d6292e97-d806-480a-adb8-fe1bd44b3b5c.jpg",
        "content": "A great idea for photo essays for students is to shoot the protest to show its power. You can capture people with signs and banners to demonstrate what they are standing for. Besides, you can learn how to capture moving subjects. Use the best example of photo essay and don’t forget about angles, composition, and framing."
    },
    "2":{
        "title": "Local Event",
        "img_url": "https://i.pinimg.com/originals/aa/5e/36/aa5e361c5d78ca663c8d831bbb5a597f.jpg",
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
    let {title, img_url, content} = req.body;
    
    content = purify.sanitize(content);
    const postId = Date.now().toString();
    console.log(postId)
    console.log(title)
    console.log(content);
    posts[postId] = {title, img_url, content};
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
    let {title, img_url, content} = req.body;
    content = purify.sanitize(content);
    
    posts[postId] = {title, img_url, content};
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

