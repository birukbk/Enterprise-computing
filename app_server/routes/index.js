var express = require('express');
var router = express.Router();
var ctrlBook = require('../controllers/books');
var ctrlOthers = require('../controllers/others');

/* book pages */
router.get('/', ctrlBook.homelist);
router.get('/book/:bookid', ctrlBook.bookInfo);

router.get('/book/:bookid/review/new', ctrlBook.addReview);
router.post('/book/:bookid/review/new', ctrlBook.doAddReview);

//router.get('/books', ctrlBook.bookInfo);
//router.get('/books/review/new', ctrlBook.addReview);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
