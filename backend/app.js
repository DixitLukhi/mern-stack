const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Home Page.");
});

app.get("/about", (req, res) => {
    return res.send("Dix Lukhi.");
});

app.listen(port, () => {
    return console.log(`Connecting to server at port ${port}`);
});
