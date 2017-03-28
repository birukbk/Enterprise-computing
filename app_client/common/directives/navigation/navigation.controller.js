(function () {

  angular
    .module('bookFaceApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$book', 'authentication'];
  function navigationCtrl($book, authentication) {
    var vm = this;

    vm.currentPath = $book.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      $book.path('/');
    };

  }
})();