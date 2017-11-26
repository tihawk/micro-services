//var angular = require('angular');

var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless μicro-services';
	$scope.descr = "Coming soon..."

}]);