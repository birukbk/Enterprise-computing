(function() {
    angular
        .module('bookFaceApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'bookData'];

    function reviewModalCtrl($modalInstance, bookData) {
        var vm = this;
        vm.bookData = bookData;

        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                console.log(vm.formData);
                return false;
            }
        };

        vm.modal = {
            cancel: function() {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();
