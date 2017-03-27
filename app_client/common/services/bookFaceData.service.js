(function() {
  angular
    .module('bookFaceApp')
    .service('bookFaceData', bookFaceData);

    var bookById = function (bookid) {
      return $http.get('/api/books/' + bookid);
    };
    
    bookFaceData.$inject = ['$http'];
    function bookFaceData ($http) {
    	var bookList = function () {
      return $http.get('/api/books');
    };

      return {
      	bookList: bookList
      }
      


  }

})();