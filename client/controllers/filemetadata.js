var myApp = angular.module('myApp');

myApp.controller('FileMetadataController', ['$scope', '$http', 'Upload', function($scope, $http, Upload){

	$scope.title = "useless file metadata μicro-service";
	$scope.descr = "Upload a file, and see its metadata. Totally useless, you can just check that via the properties locally. Mission accomplished";
	$scope.uploading = false;

	var formData = new FormData();

	$scope.upload = function(){
		$scope.uploading = true;
		Upload.upload({
			url: '/api/filemetadata',
			data: {
				file: $scope.file
			}
		}).then(response=>{
			$scope.fileData = response.data;
			$scope.uploading = false;
		}, error=>{
			console.log(error.status);
			$scope.uploading = false;
		}, event=>{
			$scope.progress = ((event.loaded/event.total)*100).toFixed(1);
		});
	};

}]);