(function () {
angular
    .module('bookFaceApp')
    .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'bookFaceData'];
function homeCtrl($scope,bookFaceData) {
    var vm = this;
    vm.pageHeader = {
        title: 'bookFace',
        strapline: 'Welcome to your favorite books!'
    };
    vm.sidebar = {
        content: "Looking for something to read? BookFace helps you find books to read easly!"
    };
        bookFaceData.bookList()
            .success(function(data) {
                vm.data = { books: data };
                console.log(vm.data);
            })
            .error(function(e) {
                vm.message = "Sorry, something's gone wrong";
            });
    vm.showError = function(error) {
        $scope.$apply(function() {
            vm.message = error.message;
        });
    };
}

})();
