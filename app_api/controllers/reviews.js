var mongoose = require('mongoose');
var Loc = mongoose.model('Book');
var sendJsonResponse = function(res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.reviewsReadOne = function(req,res){
	sendJsonResponse(res,200,{"status":"success"});
	};