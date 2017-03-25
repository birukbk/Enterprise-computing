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
var bookListCtrl = function ($scope) {
	$scope.data = {
		books :[{
      title: 'Programming in Scala',
      bookAuthor: 'Martin Odersky',
      rating: 3,
      _id: '5370a35f2536f6785f8dfb6a'
    },{
      title: '1984',
      bookAuthor: 'George orwel',
      rating: 5,
      _id: '5370a35f2536f6785f8dfb6a'
    }]};
};

angular
  .module('bookFaceApp')
  .directive('ratingStars', ratingStars)
  .controller('bookListCtrl', bookListCtrl);