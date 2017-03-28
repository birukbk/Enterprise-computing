(function() {
    angular
        .module('bookFaceApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'bookFaceData', 'bookData'];

    function reviewModalCtrl($modalInstance, bookFaceData, bookData) {
        var vm = this;
        vm.bookData = bookData;

        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.bookData.bookid, vm.formData);
            }
        };

        vm.doAddReview = function(bookid, formData) {
            bookFaceData.addReviewById(bookid, {
                    author: formData.name,
                    rating: formData.rating,
                    reviewText: formData.reviewText
                })
                .success(function(data) {
                    vm.modal.close(data);
                })
                .error(function(data) {
                    vm.formError = "Your review has not been saved, try again";
                });
            return false;
        };

        vm.modal = {
            close: function(result) {
                $modalInstance.close(result);
            },
            cancel: function() {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();
