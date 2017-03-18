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
    title: req.query.title,
    bookAuthor: req.query.bookAuthor,
    rating : req.query.rating
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



/* PUT /api/books/:bookid */
module.exports.booksUpdateOne = function(req, res) {
  if (!req.params.bookid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, bookid is required"
    });
    return;
  }
  Loc
    .findById(req.params.bookid)
    .select('-reviews -rating')
    .exec(
      function(err, book) {
        if (!book) {
          sendJSONresponse(res, 404, {
            "message": "bookid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        book.title = req.query.title;
        book.bookAuthor = req.query.bookAuthor;
        book.save(function(err, book) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, book);
          }
        });
      }
  );
};