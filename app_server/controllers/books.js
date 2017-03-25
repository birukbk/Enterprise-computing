var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://hidden-hollows-18954.herokuapp.com";
}
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res) {
    res.render('books-list', {
        title: 'Welcome to your favorite books',
        pageHeader: {
            title: '',
            strapline: 'Welcome to your favorite books'
        },
        sidebar: "Looking for something to read? BookFace helps you find books to read easly!"
    });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
   renderHomepage(req, res);
};

var getbookInfo = function(req, res, callback) {
    var requestOptions, path;
    path = "/api/books/" + req.params.bookid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var renderDetailPage = function(req, res, bookInfo) {
    res.render('book-info', {
        title: bookInfo.title,
        pageHeader: { title: bookInfo.title },
        sidebar: {
            context: 'All your favorite books in one place.',
            callToAction: 'If you\'ve read this book and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        book: bookInfo
    });
};


/* GET 'book info' page */
module.exports.bookInfo = function(req, res) {
    getbookInfo(req, res, function(req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};

var renderReviewForm = function(req, res, bookInfo) {
    res.render('book-review-form', {
        title: 'Review ' + bookInfo.title + ' on BookFace',
        pageHeader: { title: 'Review ' + bookInfo.title },
        error: req.query.err
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    getbookInfo(req, res, function(req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res) {
    var requestOptions, path, bookid, postdata;
    bookid = req.params.bookid;
    path = "/api/books/" + bookid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/book/' + bookid + '/reviews/new?err=val');
    } else {
        request(
            requestOptions,
            function(err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/book/' + bookid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/book/' + bookid + '/reviews/new?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }

};

var getbookInfo = function(req, res, callback) {
    var requestOptions, path;
    path = "/api/books/" + req.params.bookid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};