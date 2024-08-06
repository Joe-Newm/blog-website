import express from "express";
import bodyParser from "body-parser";
import { openDb, createTable } from "../blog-website/db/database.js";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize the database
createTable();

app.get("/", async (req, res) => {
    const db = await openDb();
    const posts = await db.all('SELECT * FROM blog_posts ORDER BY date DESC');
    res.render("index.ejs", {posts});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post('/submit-post', async (req, res) => {
    const db = await openDb();
    const { title, content } = req.body;
    const date = new Date().toISOString();

    await db.run('INSERT INTO blog_posts (title, content, date) VALUES (?, ?, ?)', [title, content, date]);

    res.redirect("/create");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});