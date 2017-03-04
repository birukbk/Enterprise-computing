/* GET home page */
module.exports.homelist = function(req, res){
  res.render('book-list', { title: 'Home' });
};

/* GET Book info page */
module.exports.bookInfo = function(req, res){
  res.render('book-info', { title: 'Book Info' });
};

/* GET Add review page */
module.exports.addReview = function(req, res){
  res.render('book-review-form', { title: 'Add Review' });
};
