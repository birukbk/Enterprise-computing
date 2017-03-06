var mongoose = require('mongoose');
var Loc = mongoose.model('Book');
var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// module.exports.booksReadOne = function(req, res){
//   sendJsonResponse(res, 200, {"status" : "success"});
// };



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