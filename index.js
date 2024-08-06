import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post('/submit-post', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    console.log('Title:', title);
    console.log('Content:', content);
    // Here you would typically save the post to a database
    res.send('Post submitted successfully!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});