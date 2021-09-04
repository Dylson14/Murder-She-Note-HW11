const express = require("express");
const path = require("path");
const app = express(); /* initialized the app*/

const port = process.env.PORT|| 3000; /* process.env.PORT if a PORT value has been provided in a .env then set the PORt to that vallue or set it to the value you've set. */

/* We are setting up the middlewares here*/
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended:true /* choosing between QS and query string libraries. */
}));
/* we are creating a route that leads to the html */
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

/* By default I want to hide the save buttton icon */
const hide = (elem) => {
    elem.style.display = "none";

    <i class="fas fa-save text-light save-note"></i> /* this is the bit of HTML I want to target. */
}




/* Set up the app.listen, and check if the server runs!*/
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})