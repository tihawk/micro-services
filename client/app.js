var myApp = angular.module('myApp', ['ngRoute', 'angular.filter']);

myApp.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'views/home.html'
		})
		.when('/timestamp', {
			controller: 'TimestampController',
			templateUrl: 'views/timestamp.html'
		})
		.when('/headerparser', {
			controller: 'HeaderparserController',
			templateUrl: 'views/headerparser.html'
		})
		.when('/urlshortener', {
			controller: 'URLShortenerController',
			templateUrl: 'views/urlshortener.html'
		})
		.when('/imagesearch', {
			controller: 'ImagesearchController',
			templateUrl: 'views/imagesearch.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});