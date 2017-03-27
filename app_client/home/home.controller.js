angular
    .module('bookFaceApp')
    .controller('homeCtrl', homeCtrl);

  
  function homeCtrl ($scope) {
    var vm = this;
    vm.pageHeader = {
      title: 'bookFace',
      strapline: 'Welcome to your favorite books!'
    };
     vm.sidebar = {
      content: "Looking for something to read? BookFace helps you find books to read easly!"
    };
  }