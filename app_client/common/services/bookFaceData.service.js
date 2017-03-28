(function() {
  angular
    .module('bookFaceApp')
    .service('bookFaceData', bookFaceData);

    bookFaceData.$inject = ['$http'];
    function bookFaceData ($http) {
    	var bookList = function () {
      return $http.get('/api/books');
    };
     var bookById = function (bookid) {
      return $http.get('/api/books/' + bookid);
    };

      return {
      	bookList: bookList,
      	bookById: bookById

      }
  }

})();