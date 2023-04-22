const express = require("express");
const fs = require("fs");
const business = require("../business/business.js");
const app = express();
const path = require("path");
const REQUEST_URL = "/users";


const apiServ = {
    start : function(port){
        const frontpath = __dirname+"/../../";
        const USERS_FILE_PATH = __dirname+"/../data/users.json";

        app.use(express.json());
        app.use(express.static(path.join(frontpath, "public")));
        app.set('view engine', 'ejs');
        
        
        app.listen(port, () => {
            console.log(`App listening to port ${port}`);
        });

        app.get(REQUEST_URL, (req,res) => {
            const rawdata = fs.readFileSync(USERS_FILE_PATH);
            var splitsize = 20;
            var users = JSON.parse(rawdata);


            console.log(`Getting users at ${req.ip}`);
            res.render("pages/index", {
                all_users : users,
                splitsize : splitsize,
            });
            
        })

        app.post(REQUEST_URL, (req,res) => {
            let is_added = business.addUser(req.body);
            
        })

        app.get("/data",(req,res) => {
            const users = business.getAllUsers();
            res.send(users);
        })

        app.get("/adduser", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.sendFile(path.resolve(frontpath+"public/adduser.html"));

        })

        app.get("/edit", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.render("pages/edit");
        });
    }
};

module.exports = apiServ;