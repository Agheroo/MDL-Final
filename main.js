const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const usersfile = __dirname+"/users.json";


app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});

app.get("/", (req,res) => {
    const rawdata = fs.readFileSync(usersfile);
    var splitsize = 20;
    var users = JSON.parse(rawdata);
    
    console.log(`Getting users at ${req.ip}`);
    res.render("pages/index", {
        all_users : users,
        splitsize : splitsize,
    });
});
app.get("/edit", (req,res) => {
    console.log(`Getting users at ${req.ip}`);
    res.render("pages/home");
});