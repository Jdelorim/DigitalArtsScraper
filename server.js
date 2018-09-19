var express = require('express');
var bodyParser = require("body-parser");
var exhbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("handlebars", exhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var server = app.listen(PORT,listening);

function listening() {
    console.log("listening on:", PORT);
}
//module.exports = app;
    