'use strict';

/**
 * @ngdoc function
 * @name bookmarkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmarkApp
 */

bookmarkApp.controller('mainCtrl', ['$scope', 'otherServices', function ($scope, otherServices) {

	$scope.loading = false;
	$scope.bookmarks = [];
	$scope.page = 0;
	$scope.showLoadMore = false;

	$scope.getPopularBookmarks = function(){

		$scope.loading = true;
		$scope.page++;

		otherServices.getPopularBookmarks($scope.page).then(function(res){
			
			$scope.bookmarks = res.data.bookmarks;
			
			$scope.loading = false;
			if(res.data.bookmarks.length%10)
				$scope.showLoadMore = false;
			else
				$scope.showLoadMore = true;
		},
		function(err){
			$scope.loading = false;
			$scope.page--;
		});

	}

	$scope.getPopularBookmarks($scope.page);	
    
}]);
