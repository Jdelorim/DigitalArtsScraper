var express = require('express');
var bodyParser = require("body-parser");
var exhbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
//----------------------
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var PORT = process.env.PORT || 4040;
var app = express();
//---

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(logger("dev"));
mongoose.connect("mongodb://localhost/scrapdb", {useNewUrlParser: true});

app.engine("handlebars", exhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log(`listening on ${PORT}`)
})

    