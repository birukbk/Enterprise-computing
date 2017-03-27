(function () {
 angular.module('bookFaceApp', ['ngRoute','ngSanitize']);

 function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: 'home/home.view.html',
      	controller : 'homeCtrl',
      	controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/book/:bookid', {
        templateUrl: '/bookDetail/bookDetail.view.html',
        controller: 'bookDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
  }

  angular
    .module('bookFaceApp')
    .config(['$routeProvider','$locationProvider', config]);

})();