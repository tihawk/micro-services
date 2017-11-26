//var angular = require('angular');

var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless μicro-services';
	$scope.descr = "This is a small collection of pretty useless web micro-services. They can have a purpose if you find one for them. Apart from that, this is more of a fun project for a custom API. Access them via the navbar on top, or go to API and find out how to access these tools using requests to the API from your website."

}]);