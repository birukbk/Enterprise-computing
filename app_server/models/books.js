var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bookAutor: {
    	type: String,
    	required: true
    },
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    }
    reviews: [reviewSchema]
});
mongoose.model('Book', bookSchema);