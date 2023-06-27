const express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const { Console } = require("console");
const route = require("./routes/route");

var app = express();

const port = process.env.PORT || 4000;
//connect to mongo db
mongoose.connect("mongodb://127.0.0.1:27017/EmployeeManagementSystem");

//when connected
mongoose.connection.on("connected", () => {
    console.log("connected to database");
});

//if error when connecting to database
mongoose.connection.on("error", (err) => {
    console.log("error connecting to database: " + err);
});

//adding middleware=cors
app.use(
    cors({
        origin: "*",
    })
);

app.use(function (req, res, next) {
    // Website you wish to allow to connect

    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api", route);
//testing server
app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    // console.log("Server is running at port: " + port);
});
module.exports = app;
