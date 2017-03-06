var express = require('express');
var router = express.Router();
var ctrlbooks = require('../controllers/books');
var ctrlReviews = require('../controllers/reviews');


//router.post('/books', ctrlbooks.booksCreate);
 router.get('/books/:locationid', ctrlbooks.booksReadOne);
// router.put('/books/:locationid', ctrlbooks.booksUpdateOne);
// router.delete('/books/:locationid', ctrlbooks.booksDeleteOne);

// // reviews
 //router.post('/books/:locationid/reviews', ctrlReviews.reviewsCreate);
 router.get('/books/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
// router.put('/books/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
// router.delete('/books/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
