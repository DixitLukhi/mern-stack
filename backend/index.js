const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => res.send("Home Page."));

app.get("/about", (req, res) => res.send("Dix Lukhi."));

app.listen(port, () => console.log(`Connecting to server at port ${port}`))
