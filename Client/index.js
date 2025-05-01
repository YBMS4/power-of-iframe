// ### Client

const http = require("http");
const express = require('express');
const path = require("path");

const app = express();
const server = http.createServer(app);

// #####################################################

app.use(express.static(path.join(__dirname, "public/")));

// #####################################################

const host = "localhost";
const port = 3001;
server.listen(port, host, () => {
    console.log(`Server open and listning on "http://${host}:${port}/"`);
});