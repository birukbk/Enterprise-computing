var mongoose = require('mongoose');
var Loc = mongoose.model('Book');
var sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
};

// module.exports.reviewsReadOne = function(req,res){
// 	sendJsonResponse(res,200,{"status":"success"});
// 	};
// 	
module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.bookid && req.params.reviewid) {
    Loc
      .findById(req.params.bookid)
      .select('name reviews')
      .exec(
        function(err, book) {
          console.log(book);
          var response, review;
          if (!book) {
            sendJSONresponse(res, 404, {
              "message": "bookid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (book.reviews && book.reviews.length > 0) {
            review = book.reviews.id(req.params.reviewid);
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                book: {
                  name: book.name,
                  id: req.params.bookid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, bookid and reviewid are both required"
    });
  }
};

/* POST a new review, providing a bookid */
/* /api/books/:bookid/reviews */
module.exports.reviewsCreate = function(req, res) {
  if (req.params.bookid) {
    Loc
      .findById(req.params.bookid)
      .select('reviews')
      .exec(
        function(err, book) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddReview(req, res, book);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, bookid required"
    });
  }
};


var doAddReview = function(req, res, book) {
  if (!book) {
    sendJSONresponse(res, 404, "bookid not found");
  } else {
    book.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    book.save(function(err, book) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(book._id);
        thisReview = book.reviews[book.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};