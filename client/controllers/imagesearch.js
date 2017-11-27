var myApp = angular.module('myApp');

myApp.controller('ImagesearchController', ['$scope', '$http', function($scope, $http){

	$scope.title = 'useless image search μicro-service';
	$scope.descr = "Input a search querry, and hit 'Search' to display the results. I'm sure you've used a search engine before."
	$scope.page = 1;

	$scope.search = function(){
		console.log($scope.searchTerm);
		$http.get('/api/imagesearch/' + $scope.searchTerm + '?offset=' + $scope.page)
			.then(response=>{
				$scope.images = response.data;
				console.log($scope.images);
			}, error=>{
				console.log(error);
			});
	};

	$scope.nextPage = function(){
		$scope.page += 10;
		$scope.search();
	}

	$scope.prevPage = function(){
		if($scope.page >= 11){
			$scope.page -= 10;
			$scope.search();
		}
	}

}]);