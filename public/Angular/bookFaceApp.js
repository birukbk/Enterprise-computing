angular.module('bookFaceApp',[]);
var ratingStars = function () {
  return {
    scope: {
      thisRating : '=rating'
    },
    // template : "{{ thisRating }}"
    templateUrl: '/angular/rating-stars.html'
  };
};
var bookListCtrl = function ($scope, bookData) {
	$scope.message = "Fetching the list of books...";
	bookData
		.success(function(data){
			$scope.data = { books : data};
		})
		.error(function(e){
			console.log(e);
		});
};

var bookData = function ($http) {
	return $http.get('/api/books');
  };

angular
  .module('bookFaceApp')
  .directive('ratingStars', ratingStars)
  .service('bookData', bookData)
  .controller('bookListCtrl', bookListCtrl);