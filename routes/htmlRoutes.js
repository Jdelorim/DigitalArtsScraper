var db = require("../models");


module.exports = function (app) {

    var axios = require("axios");
    var cheerio = require("cheerio");

   app.get("/scraped", function (req, res) {

        const results = [];
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
                    saveme: false, 
                    comment: "test"
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
      var storeID = req.body.ID;
      var saveme = req.body.saveme;
       console.log("body:", storeID);
       console.log("saveme:", saveme)
        
      db.Article.findOneAndUpdate({_id: storeID}, {$set:{saveme: saveme}}, {new: true}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        });
    });

    app.post("/delfromsaved", function (req, res) {
        var storeID = req.body.ID;
        var saveme = req.body.saveme;
         console.log("body:", storeID);
         console.log("saveme:", saveme)
          
        db.Article.findOneAndUpdate({_id: storeID}, {$set:{saveme: saveme}}, {new: true}, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              }
          
              console.log(doc);
          });
      });

      app.post("/saveComment", function (req, res) {
        var storeID = req.body.ID;
        var saveme = req.body.saveme;
        var comment = req.body.comment;
         console.log("body:", storeID);
         console.log("saveme:", comment)
          
        db.Article.findOneAndUpdate({_id: storeID}, {$set:{saveme: saveme, comment: comment}}, {new: true}, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              }
          
              console.log(doc);
              console.log("hitme");
              
          }).then(function(){
            res.redirect("/saved");
          });

       
      });

    app.get("/saved", function (req, res) {
        db.Article.find({})
        .then(function (dbArticle) {
            //  console.log("ARTICLES: -----------", dbArticle)
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
        db.Article.updateMany({}, {$set:{saveme: false}}, {new: true}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
            res.redirect('/saved');
        });
    });
};