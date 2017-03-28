(function() {
    angular
        .module('bookFaceApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'bookData'];

    function reviewModalCtrl($modalInstance, bookData) {
        var vm = this;
        vm.bookData = bookData;
        
        vm.onSubmit = function() {
            console.log(vm.formData);
            return false;
        };
        
        vm.modal = {
            cancel: function() {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();
