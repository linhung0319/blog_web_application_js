import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = {"1": "post 1", "2": "post 2"};

app.use(bodyParser.urlencoded({ extend: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})