var myApp = angular.module('myApp');

myApp.controller('TimestampController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless timestamp μicro-service';
	$scope.descr = 'Enter a date like a natural language date (20 Feb 1991), or in ISO standard (1991 02 20), or enter an integer, representing the so-called unix-time - the time in seconds since 01.01.1970. The output will consist of a natural language representation of the entered date, as well as the unix timestamp.'

	var getDate = function(){
		$http.get('/api/timestamp/'+$scope.input)
			.then(function(response){
				$scope.date = response.data;
			}, function(error){
				console.log(error);
			});
	}

	$scope.getDate = getDate;

}]);