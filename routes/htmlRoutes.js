var db = require("../models");


module.exports = function (app) {

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
            });

            db.Article.create(results)
                .then(function (dbArticle) {
                   
                })
                .catch(function (err) {
                    return res.json(err);
                });
             res.redirect("/");
        });
    });

    app.get("/", function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {
                // console.log("ARTICLES: -----------", dbArticle)
                res.render('index', {
                    article: dbArticle,
                    title: "Digital Arts Scraper",
                });
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    app.post("/saveID", function (req, res) {
      var storeID = req.body.body;
       console.log("body:", storeID);
        
      db.Article.findOneAndUpdate({_id: storeID}, {$set:{saveme: true}}, {new: true}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({})
        .then(function (dbArticle) {
             console.log("ARTICLES: -----------", dbArticle)
            res.render('saved', {
                article: dbArticle,
                title: "Digital Arts Scraper",
            });
        })
        .catch(function (err) {
            res.json(err);
        })
    });

    app.get("/clear", function (req, res) {
        db.Article.remove({}).then(function () {
            res.redirect('/');
        });
    });
    app.get("/clear2", function (req, res) {
        db.Article.remove({}).then(function () {
            res.redirect('/saved');
        });
    });
  

};