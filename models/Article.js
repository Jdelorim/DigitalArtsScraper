var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,       
        required: true
    },
    blurb: {
        type: String,    
        required: true    
    },
    link: {
        type: String,   
        required: true    
    },
    img: {
        type: String,   
        required: true
    },
    saveme: {
        type: String,    
        required: true
    }, 
    comment: {
        type: String,
        required: true
    }
    
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;