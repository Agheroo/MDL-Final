const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const usersfile = __dirname+"/users.json";

const rawdata = fs.readFileSync(usersfile);



app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});

app.get("/", (req,res) => {
    var users = JSON.parse(rawdata);
    var twenty_users = users.slice(0,20);

    console.log(`Getting users at ${req.ip}`);
    res.render("pages/index", {
        disp_users : twenty_users
    });
});
app.get("/edit", (req,res) => {
    console.log(`Getting users at ${req.ip}`);
    res.render("pages/home");
});