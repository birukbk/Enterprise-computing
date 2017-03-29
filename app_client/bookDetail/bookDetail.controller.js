(function() {
    angular
        .module('bookFaceApp')
        .controller('bookDetailCtrl', bookDetailCtrl);

    bookDetailCtrl.$inject = ['$routeParams','$location', '$modal', 'bookFaceData','authentication'];

    function bookDetailCtrl($routeParams,location, $modal, bookFaceData,authentication) {
        var vm = this;
        vm.bookid = $routeParams.bookid;
        
        vm.isLoggedIn = authentication.isLoggedIn();
        //vm.currentPath = $location.path();
        
        bookFaceData.bookById(vm.bookid)
            .success(function(data) {
                vm.data = { book: data };
                vm.pageHeader = {
                    title: vm.data.book.title
                };
            })
            .error(function(e) {
                console.log(e);
            });

        vm.popupReviewForm = function() {
            var modalInstance = $modal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    bookData: function() {
                        return {
                            bookid: vm.bookid,
                            bookTitle: vm.data.book.title
                        };
                    }
                }
            });
            modalInstance.result.then(function(data) {
                vm.data.book.reviews.push(data);
            });
        };
    }
})();
