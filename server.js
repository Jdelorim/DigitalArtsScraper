var express = require('express');
var cheerio = require('cheerio');
var request = require('request');


request("https://www.digitalartsonline.co.uk/news/", function(error, response, html) {

    var $ = cheerio.load(html);

    var results = [];
    $( ".article" || ".thumbContainer").each(function(i, element) {
    
        var title = $(element).text();
       // var link = $("thumbContainer").find("a href");
      // var newTitle =  $(element).find().children().attr("h2");
        var link = $(element).children().attr("href");

        results.push({
            title: title,
            link: link
        });
        
    });
    console.log("title",results);
    //console.log(results);
});
    