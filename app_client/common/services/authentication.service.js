(function() {
    angular
        .module('bookFaceApp')
        .service('authentication', authentication);
    authentication.$inject = ['$window'];

    function authentication($window) {
        var saveToken = function(token) {
            $window.localStorage['bookFace-token'] = token;
        };
        var getToken = function() {
            return $window.localStorage['bookFace-token'];
        };
        return {
            saveToken: saveToken,
            getToken: getToken
        };
    }
})();
