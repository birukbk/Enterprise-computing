/* GET home page */
var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://hidden-hollows-18954.herokuapp.com";
}
module.exports.homelist = function(req, res) {
    res.render('books-list', {
        title: 'Welcome to your favorite books',
        pageHeader: {
            title: '',
            strapline: 'Welcome to your favorite books'
        },
        sidebar: "Looking for something to read? BookFace helps you find books to read easly!",
        books: [{
            title: 'Zero to One: Notes on Startups, or How to Build the Future',
            bookAuthor: 'Peter Thiel',
            rating: 3, 
            comment: '100'
        }, {
            title: 'Steve Jobs',
            bookAuthor: 'Walter Isaacson',
            rating: 4,
            comment: '200'
        }, {
            title: 'David and Goliath: Underdogs, Misfits, and the Art of Battling Giants',
            bookAuthor: 'Malcolm Gladwell',
            rating: 2,
            comment: '250'
        }, {
            title: '1984',
            bookAuthor: 'George Orwell',
            rating: 4,
            comment: '200'
        }, {
            title: 'The Paradox of Choice: Why More Is Less',
            bookAuthor: 'Barry Schwartz',
            rating: 4,
            comment: '200'
        }]
    });
};
/* GET Book info page */
module.exports.bookInfo = function(req, res){
  res.render('book-info', { title: 'Book Info' });
};

/* GET Add review page */
module.exports.addReview = function(req, res){
  res.render('book-review-form', { title: 'Add Review' });
};
