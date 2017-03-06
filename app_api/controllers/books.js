var mongoose = require('mongoose');
var Loc = mongoose.model('Book');
var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

/* GET a book by the id */
module.exports.booksReadOne = function(req, res) {
  console.log('Finding book details', req.params);
  if (req.params && req.params.bookid) {
    Loc
      .findById(req.params.bookid)
      .exec(function(err, book) {
        if (!book) {
          sendJSONresponse(res, 404, {
            "message": "bookid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(book);
        sendJSONresponse(res, 200, book);
      });
  } else {
    console.log('No bookid specified');
    sendJSONresponse(res, 404, {
      "message": "No bookid in request"
    });
  }
};

/* POST a new book */
/* /api/books */
module.exports.booksCreate = function(req, res) {
  console.log(req.body);
  Loc.create({
    title: req.body.title,
    bookAutor: req.body.bookAutor,
    rating : req.body.rating
  }, function(err, book) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(book);
      sendJSONresponse(res, 201, book);
    }
  });
};