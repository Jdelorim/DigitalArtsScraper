var path = require("path");


module.exports = function(app) {
    
    app.get("/", function (req,res) {
      // res.sendFile(path.join(__dirname, "../public/index.html"));
      res.render("index",{ title:"Digital Arts Scraper" });

    });
    
    app.get("/saved", function (req,res) {
        res.render("saved",{  title:"Saved Articles"});
    });
};