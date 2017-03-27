 angular.module('bookFaceApp', ['ngRoute']);

 function config ($routeProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: 'home/home.view.html',
      	controller : 'homeCtrl'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('bookFaceApp')
    .config(['$routeProvider', config]);