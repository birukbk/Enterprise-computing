var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlbooks = require('../controllers/books');
var ctrlReviews = require('../controllers/reviews');

//books
router.get('/books', ctrlbooks.bookListByAuther);
router.post('/books', ctrlbooks.booksCreate);
router.get('/books/:bookid', ctrlbooks.booksReadOne);
router.get('/books/:bookid/titles/:titleid', ctrlbooks.titlesReadOne);
router.put('/books/:bookid', ctrlbooks.booksUpdateOne);
router.delete('/books/:bookid', ctrlbooks.booksDeleteOne);
// reviews
router.post('/books/:bookid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/books/:bookid/reviews/:reviewid', auth,  ctrlReviews.reviewsUpdateOne);
router.delete('/books/:bookid/reviews/:reviewid', auth,ctrlReviews.reviewsDeleteOne);

var ctrlAuth = require('../controllers/authentication');
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
