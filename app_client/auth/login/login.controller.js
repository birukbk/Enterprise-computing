(function () {

  angular
    .module('bookFaceApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$book','authentication'];
  function loginCtrl($book, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to bookFace'
    };

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $book.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $book.search('page', null); 
          $book.path(vm.returnPage);
        });
    };

  }

})();