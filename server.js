const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { parse } = require("path");
const app = express(); /* initialized the app*/
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const port = process.env.PORT || 3000; /* process.env.PORT if a PORT value has been provided in a .env then set the PORt to that vallue or set it to the value you've set. */

/* We are setting up the middlewares here*/
app.use(express.static("./Develop/public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true /* choosing between QS and query string libraries. */,
  })
);
/* we are creating a route that leads to the html */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
const notes = readFileAsync(path.join(__dirname, "./Develop/db/db.json"), "utf-8")
res.status(200).json(notes)
})

app.post("/api/notes", async(req, res) => {
  const newNote = req.body/* JSON.parse(req.body) */
  const db =  await readFileAsync(path.join(__dirname, "./Develop/db/db.json"), "utf-8")
  console.log(db);
  const newVar = JSON.parse(db);
  console.log(newVar);
  newVar.push(newNote);
  console.log(newVar);
  const newDB = writeFileAsync(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(db))
res.status(201).json(db);
  /* const infoJSON = utils
  fs.writeFile */
});

/* Set up the app.listen, and check if the server runs!*/
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
