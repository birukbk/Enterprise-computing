var mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: { type: String, required: true },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var titleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    favouredBy: {
        type:[String],
        required: false
    },
    reviews: [reviewSchema]
   
});



var bookSchema = new mongoose.Schema({
    bookAuthor: {
        type: String,
        required: true
    },
    titles: [titleSchema]
});
mongoose.model('Book', bookSchema);


