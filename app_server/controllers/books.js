/* GET home page */
module.exports.homelist = function(req, res){
  res.render('book-list', { 
  	title: 'Welcome to your favorite books!',
  	pageHeader:{
  		title: 'BookFace',
  		strapline: "Welcome to your favorite books!"

  	} 
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
