(function() {
    angular
        .module('bookFaceApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$book', 'authentication'];

    function registerCtrl($book, authentication) {
        var vm = this;
        vm.pageHeader = {
            title: 'Create a new bookFace account'
        };
        vm.credentials = {
            name: "",
            email: "",
            password: ""
        };
        vm.returnPage = $book.search().page || '/';
        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doRegister();
            }
        };
        vm.doRegister = function() {
            vm.formError = "";
            authentication
                .register(vm.credentials)
                .error(function(err) {
                    vm.formError = err;
                })
                .then(function() {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };


    }
})();
