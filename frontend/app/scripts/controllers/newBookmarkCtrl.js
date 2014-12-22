'use strict';

/**
 * @ngdoc function
 * @name bookmarkApp.controller:newBookmarkCtrl
 * @description
 * # newBookmarkCtrl
 * Controller of the bookmarkApp
 */

bookmarkApp.controller('newBookmarkCtrl', ['$scope', 'otherServices', '$location', function ($scope, otherServices, $location) {

	$scope.url = '';
	$scope.tags = '';
	$scope.errMsg = '';

	$scope.addNewBookmark = function(url, tags){
	
		$scope.errMsg = '';

		otherServices.newBookmark(url, tags).then(function(res){
			$location.path('/home');
		},
		function(err){
			$scope.errMsg = 'Sorry we are unable to add your bookmark. Kindly try again.';
		});

	}
    
}]);
