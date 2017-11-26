var myApp = angular.module('myApp');

myApp.controller('HeaderparserController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'Header Parser'
	$scope.descr = 'This magic crystall monitor-shaped flat ball will tell you muchness (or at least whatever the header of your HTTP request shares) about you, if you dare...';

	$scope.getInfo = function(){
		$http.get('/api/whoami')
			.then(function(response){
				$scope.info = response.data;
			}, function(error){
				console.log(error);
			})
	};

}]);