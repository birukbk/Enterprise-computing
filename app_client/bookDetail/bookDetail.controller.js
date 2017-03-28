(function() {
    angular
        .module('bookFaceApp')
        .controller('bookDetailCtrl', bookDetailCtrl);

    bookDetailCtrl.$inject = ['$routeParams', '$modal', 'bookFaceData'];

    function bookDetailCtrl($routeParams, $modal, bookFaceData) {
        var vm = this;
        vm.bookid = $routeParams.bookid;
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
                resolve : {
                bookData : function () {
                    return {
                        bookid : vm.bookid,
                        bookTitle : vm.data.book.title
                        };
                        }
                        }
            });
        };
    }
})();
