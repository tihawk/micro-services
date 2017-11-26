var myApp = angular.module('myApp');

myApp.controller('URLShortenerController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless url shortener μicro-service';
	$scope.descr = "Enter a URL address into the bar, hit 'Shorten', and behold! There's a somewhat shortened version of your URL. Guaranteed to not collect any information about the URLs provided, apart from the link itself. And yes, a short version of the URL to this particular page already exists under /l/4. Incepted much? Note: if your 'Invalid URL' error persists, try adding a protocol, such as 'http://'. Note: If you have been redirected here from a supposed short url, then that website was non-existent. Have fun!";

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