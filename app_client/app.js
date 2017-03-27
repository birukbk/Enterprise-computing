(function () {
 angular.module('bookFaceApp', ['ngRoute']);

 function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: 'home/home.view.html',
      	controller : 'homeCtrl',
      	controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
  }

  angular
    .module('bookFaceApp')
    .config(['$routeProvider','$locationProvider', config]);

})();