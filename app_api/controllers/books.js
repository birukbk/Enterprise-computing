var mongoose = require('mongoose');
var Bok = mongoose.model('Book');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET a book by the id */
module.exports.booksReadOne = function(req, res) {
    console.log('Finding book details', req.params);
    if (req.params && req.params.bookid) {
        Bok
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

/* GET list of books */
module.exports.bookListByAuther = function(req, res) {
    console.log(req.body);
    Bok.find()
        .select('bookAuthor title rating')
        .exec(function(err, book) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
                console.log(book);
                sendJSONresponse(res, 201, book);
            }
        });
};

var buildLBookList = function(req, res, results, stats) {
    var books = [];
    results.forEach(function(doc) {
        books.push({
            bookAuthor: doc.obj.bookAuthor,
            title: doc.obj.title,
            rating: doc.obj.rating,
            _id: doc.obj._id
        });
    });
    return books;
};

/* POST a new book */
/* /api/books */
module.exports.booksCreate = function(req, res) {
    console.log(req.body);
    Bok.create({
        title: req.body.title,
        bookAuthor: req.body.bookAuthor,
        rating: req.body.rating
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
    Bok
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
                book.title = req.body.title;
                book.bookAuthor = req.body.bookAuthor;
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


/* DELETE /api/books/:bookid */
module.exports.booksDeleteOne = function(req, res) {
    var bookid = req.params.bookid;
    if (bookid) {
        Bok
            .findByIdAndRemove(bookid)
            .exec(
                function(err, book) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("book id " + bookid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No bookid"
        });
    }
};
