(function() {
    angular
        .module('bookFaceApp')
        .controller('bookDetailCtrl', bookDetailCtrl);

    bookDetailCtrl.$inject = ['$routeParams'];
    function bookDetailCtrl($routeParams) {
        var vm = this;
        vm.bookid = $routeParams.bookid;
        vm.pageHeader = {
            title: vm.bookid
        };
    }
})();
