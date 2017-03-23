var mongoose = require('mongoose');
var Bok = mongoose.model('Book');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST a new review, providing a bookid */
/* /api/books/:bookid/reviews */
module.exports.reviewsReadOne = function(req, res) {
    console.log("Getting single review");
    if (req.params && req.params.bookid && req.params.reviewid) {
        Bok
            .findById(req.params.bookid)
            .select('title reviews')
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
                                    title: book.title,
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


module.exports.reviewsCreate = function(req, res) {
    getAuthor(req, res, function (req, res, userName) {
    if (req.params.bookid) {
        Bok
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
});
};

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

};


var doAddReview = function(req, res, book, author) {
    if (!book) {
        sendJSONresponse(res, 404, "bookid not found");
    } else {
        book.reviews.push({
            author: author,
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

var updateAverageRating = function(bookid) {
    console.log("Update rating average for", bookid);
    Bok
        .findById(bookid)
        .select('reviews')
        .exec(
            function(err, book) {
                if (!err) {
                    doSetAverageRating(book);
                }
            });
};

var doSetAverageRating = function(book) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (book.reviews && book.reviews.length > 0) {
        reviewCount = book.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + book.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        book.rating = ratingAverage;
        book.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Average rating updated to", ratingAverage);
            }
        });
    }
};


/* PUT /api/books/:bookid/reviews/reviewid */
module.exports.reviewsUpdateOne = function(req, res) {
    if (!req.params.bookid || !req.params.reviewid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid and reviewid are both required"
        });
        return;
    }
    Bok
        .findById(req.params.bookid)
        .select('reviews')
        .exec(
            function(err, book) {
                var thisReview;
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
                    thisReview = book.reviews.id(req.params.reviewid);
                    if (!thisReview) {
                        sendJSONresponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        thisReview.author = req.body.author;
                        thisReview.rating = req.body.rating;
                        thisReview.reviewText = req.body.reviewText;
                        book.save(function(err, book) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                updateAverageRating(book._id);
                                sendJSONresponse(res, 200, thisReview);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No review to update"
                    });
                }
            }
        );
};

// app.delete('/api/books/:bookid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {
    if (!req.params.bookid || !req.params.reviewid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid and reviewid are both required"
        });
        return;
    }
    Bok
        .findById(req.params.bookid)
        .select('reviews')
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
                if (book.reviews && book.reviews.length > 0) {
                    if (!book.reviews.id(req.params.reviewid)) {
                        sendJSONresponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        book.reviews.id(req.params.reviewid).remove();
                        book.save(function(err) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                updateAverageRating(book._id);
                                sendJSONresponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No review to delete"
                    });
                }
            }
        );
};
