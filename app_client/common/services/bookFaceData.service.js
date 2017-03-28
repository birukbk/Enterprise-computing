(function() {
        angular
            .module('bookFaceApp')
            .service('bookFaceData', bookFaceData);

        bookFaceData.$inject = ['$http', 'authentication'];

        function bookFaceData($http, authentication) {
            var bookList = function() {
                return $http.get('/api/books');
            };
            var bookById = function(bookid) {
                return $http.get('/api/books/' + bookid);
            };

            var addReviewById = function(bookid, data) {
                return $http.post('/api/books/' + bookid + '/reviews', data, {
                    headers: {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
                });
        };

        return {
            bookList: bookList,
            bookById: bookById,
            addReviewById: addReviewById

        }
    }

})();
