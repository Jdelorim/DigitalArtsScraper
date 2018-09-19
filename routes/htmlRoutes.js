var path = require("path");


module.exports = function(app) {
    
    app.get("/", function (req,res) {
      // res.sendFile(path.join(__dirname, "../public/index.html"));
      res.render("index",{ 
          title: "Digital Arts Scraper", 
          headline: "How Framestore created the 60s-style spaceship in Black Mirror Season 4's 'USS Calister'",
          blurb: "The VFX house created the USS Callister, the Arachnajax beast and space environments for the Emmy-winning episode."
          
        });

    });
    
    app.get("/saved", function (req,res) {
        res.render("saved",{  title:"Saved Articles"});
    });
};