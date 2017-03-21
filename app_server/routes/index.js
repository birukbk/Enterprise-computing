var express = require('express');
var router = express.Router();
var ctrlbooks = require('../controllers/books');
var ctrlOthers = require('../controllers/others');

/* book pages */
router.get('/', ctrlbooks.homelist);
router.get('/book/:bookid', ctrlbooks.bookInfo);

router.get('/book/:bookid/review/new', ctrlbooks.addReview);
router.post('/book/:bookid/review/new', ctrlbooks.doAddReview);

//router.get('/books', ctrlBook.bookInfo);
//router.get('/books/review/new', ctrlBook.addReview);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
