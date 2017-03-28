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
        vm.onSubmit = function() {};
    }
})();
