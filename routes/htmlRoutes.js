var db = require("../models");


module.exports = function(app) {

var axios = require("axios");
var cheerio = require("cheerio");

app.get("/scraped", function (req, res) {
        var results = [];
        axios.get("https://www.digitalartsonline.co.uk/news/").then(function (response) {

            var $ = cheerio.load(response.data);
            
            $(".article").each(function (i, element) {
                
                var headline = $(element).find("a").text();
                var blurb = $(element).find("p").text();
                var link = $(element).find("a").attr("href");
                var img = $(element).find("img").attr("src");

                results.push({
                    headline: headline,
                    blurb: blurb,
                    link: link,
                    img: img,
                    saveme: false
                })
                //console.log("results:", results);
              
            });
            
            db.Article.create(results)
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                console.log(err);
                //return res.json(err);
            });
            
            res.redirect("/");
        
    });

        app.get("/articles", function (req, res) {
            db.Article.find({})
                .then(function (dbArticle) {
                    res.json(dbArticle);
                })
                .catch(function (err) {
                    res.json(err);
                });
        });

        app.get("/articles/:id", function (req, res) {
            db.Article.findOne({
                    _id: req.params.id
                })
                .populate("note")
                .then(function (dbArticle) {
                    res.json(dbArticle);
                })
                .catch(function (err) {
                    res.json(err);
                })
            });
    });

    app.get("/", function (req,res) {

        db.Article.find({})
        .then(function (dbArticle) {
           // console.log("ARTICLES: -----------", dbArticle)
            res.render('index', {article: dbArticle, title: "Digital Arts Scraper"});
        })
        .catch(function (err) {
            res.json(err);
        })
      
     

    });
    app.get("/saveID", function (req, res){
        res.send("fndfndofmdsofm");
    });
    app.get("/saved", function (req,res) {

        res.render("saved",{  title:"Saved Articles"});
    });
    app.get("/clear", function (req,res) {
       
       db.Article.remove({}).then(function(){
        res.redirect('/');
       });
       
    });
};