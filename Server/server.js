// ### Server

const http = require("http");
const express = require('express');
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { getUserData } = require("./loginForm/databaseManagement/db");

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGIN = "http://localhost:3001";

// #####################################################



app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/components/:item", cors({origin : "http://localhost:3000"}), (req, res) => {
    const {item} = req.params;
    if(item === "style"){
        res.sendFile(path.join(__dirname, "loginForm/components/api.form.style.css"));
    }else if(item === "script"){
        res.type("js").sendFile(path.join(__dirname, "loginForm/components/api.form.script.js"));
    }else{
        res.status(404).send();
    }
});

app.get("/script/:name", (req, res) => {
    const {name} = req.params;
    const scripts = fs.readdirSync(path.join(__dirname, "loginForm/scripts"));
    let isIncluded = false;
    let filename;
    
    scripts.forEach((file) => {
        if(file.includes(name)){
            isIncluded = true;
            filename = file;
            return;
        }
    });

    if(isIncluded) res.type("css").sendFile(path.join(__dirname, "loginForm/scripts/" + filename));
    else res.status(404).send();
});

app.get("/style/:name", (req, res) => {
    const {name} = req.params;
    const styles = fs.readdirSync(path.join(__dirname, "loginForm/styles"));
    let isIncluded = false;
    let filename;

    styles.forEach((file) => {
        if(file.includes(name)){
            isIncluded = true;
            filename = file;
            return;
        }
    });

    if(isIncluded) res.type("js").sendFile(path.join(__dirname, "loginForm/styles/" + filename));
    else res.status(404).send();
});

// ######-----------> Most important part of this App (FR: La partie la plus importante de cette application.).

app.post("/login", express.json(), (req, res) => {
    try {
        const {email, pass} = req.body;

        if(req.headers.origin && req.headers.origin === "http://localhost:3000"){
            const userdata = getUserData({email, pass});

            if(userdata != null) res.status(200).json(userdata);
            else res.status(404).json({error: "User not Found, please try again."});
        }else{
            res.status(400).json({error: "You are not allowed to send requests, who are you ?"});
        };   
    } catch (error) {
        console.error(error, "\n----> You can continue the server didn't crash");
        res.status(500).json({error: (req.body) ? "Something went wrong" : "Please provide the 'email' and 'password'."});    
    }

    console.log(req.body);
});

app.get("/loginForm", (req, res) => {

    /**
     * @type {String}
     * * En -> This **```origin```** contains the **"referer"** header, this is the request header that we use to determine if this route is called in an **iframe** or in the **navigator URL bar**.
     * * Fr -> Cette variable **```origin```** contient le header **"referer"**, qui sert à determiner si cette route est appelée dans un iframe ou la **Barre de recherche du navigateur**
     */
    const origin = req.headers.referer || req.headers.origin;

    // if(req.headers.host)
    // console.log("origin:", req.headers.origin);
    // console.log("referrer:", req.headers.referer);
    // console.log("host:", req.headers.host);
    // console.log("###################################");
    
    if(origin && origin.includes(ALLOWED_ORIGIN)){
        res.sendFile(path.join(__dirname, "loginForm/api.form.html"));    
    }else{
        res.send("Who are you again ?");
    };
    
});

// #####################################################

const host = "localhost";
const port = 3000;
server.listen(port, host, () => {
    console.log(`Server open and listning on "http://${host}:${port}/"`);
});