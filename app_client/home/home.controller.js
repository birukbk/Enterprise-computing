angular
    .module('bookFaceApp')
    .controller('homeCtrl', homeCtrl);

  
  function homeCtrl ($scope) {
    $scope.pageHeader = {
      title: 'bookFace',
      strapline: 'Welcome to your favorite books!'
    };
     $scope.sidebar = {
      content: "Looking for something to read? BookFace helps you find books to read easly!"
    };
  }