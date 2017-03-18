var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://hidden-hollows-18954.herokuapp.com";
}



var renderHomepage = function(req, res, responseBody) {
    res.render('books-list', {
        title: 'Welcome to your favorite books',
        pageHeader: {
            title: '',
            strapline: 'Welcome to your favorite books'
        },
        sidebar: "Looking for something to read? BookFace helps you find books to read easly!",
        books: responseBody
    });
};

/* GET home page */
module.exports.homelist = function(req, res){
    var requestOptions,path;
    path = '/api/books';
    requestOptions =  {
        url : apiOptions.server + path,
        method: "GET",
        json :{}
      
};
request (
    requestOptions, 
    function(err,response,body) {
      if(err){
        console.log(err);
      } else if (response.statusCode === 200){
        console.log(body);
      } else {
        console.log(response.statusCode);
      }
         renderHomepage(req,res,body);
    }
    );
};



/* GET Book info page */
module.exports.bookInfo = function(req, res){
  res.render('book-info', { title: 'Book Info' });
};

/* GET Add review page */
module.exports.addReview = function(req, res){
  res.render('book-review-form', { title: 'Add Review' });
};
