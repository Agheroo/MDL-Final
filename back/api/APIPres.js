const express = require("express");
const fs = require("fs");
const business = require("../business/business.js");
const app = express();
const path = require("path");
const REQUEST_URL = "/data";
const cors = require("cors");

const apiServ = {
    start : function(port){
        const frontpath = __dirname+"/../../";
        app.use(express.json());
        app.use(express.static(path.join(frontpath, "public")));
        app.set('view engine', 'ejs');
        app.use(cors({
            origin: "*"
        }));
        
        app.listen(port, () => {
            console.log(`App listening to port ${port}`);
        });

        //Main rendering
        app.get("/", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.render("pages/index");
        });
        app.get("/users", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.render("pages/users");   
        });
        app.get("/adduser", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.render("pages/adduser");
        })
        app.get("/edit", (req,res) => {
            console.log(`Getting users at ${req.ip}`);
            res.render("pages/edit");
        })


        //Requests & Data management
        app.get(REQUEST_URL, (req,res) => {     //Get users (read)
            console.log(`Getting users at ${req.ip}`);
            res.json(business.getAllUsers());
        })
        app.post(REQUEST_URL, (req,res) => {    //Add user
            let is_added = business.addUser(req.body);

        });
        app.delete(REQUEST_URL, (req,res) => {  //Delete user
            let is_deleted = business.delUser(req.body);
        })
        app.put(REQUEST_URL, (req,res) => {     //Edit user

        })
    }
};

module.exports = apiServ;