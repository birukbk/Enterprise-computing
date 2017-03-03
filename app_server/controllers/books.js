/* GET home page */
module.exports.homelist = function(req, res){
  res.render('index', { title: 'Home' });
};

/* GET Book info page */
module.exports.bookInfo = function(req, res){
  res.render('index', { title: 'Book Info' });
};

/* GET Add review page */
module.exports.addReview = function(req, res){
  res.render('index', { title: 'Add Review' });
};
