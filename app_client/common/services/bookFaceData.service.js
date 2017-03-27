(function() {
  angular
    .module('bookFaceApp')
    .service('bookFaceData', bookFaceData);
    bookFaceData.$inject = ['$http'];
    function bookFaceData ($http) {
      return $http.get('/api/books');
  }

})();