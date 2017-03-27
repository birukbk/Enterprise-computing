(function() {
  angular
    .module('bookFaceApp')
    .service('bookFaceData', bookFaceData);
    function bookFaceData ($http) {
      return $http.get('/api/books');
  }

})();