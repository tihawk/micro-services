var myApp = angular.module('myApp');

myApp.controller('URLShortenerController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless url shortener μicro-service';
	$scope.descr = "Enter a URL address into the bar, hit 'Shorten', and behold! There's a somewhat shortened version of your URL. Guaranteed to not collect any information about the URLs provided, apart from the link itself.";

	$scope.urlObj = {
		url: ''
	}

	$scope.shorten = function(){
		console.log($scope.urlObj);

		$http.post('/api/shorten', $scope.urlObj)
			.then(function(response){
				$scope.shortUrl = response.data.shortUrl;
			}, function(error){
				console.log(error);
			});
	};

}]);