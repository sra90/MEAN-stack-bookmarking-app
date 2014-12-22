'use strict';

/**
 * @ngdoc function
 * @name bookmarkApp.controller:homeCtrl
 * @description
 * # homeCtrl
 * Controller of the bookmarkApp
 */

bookmarkApp.controller('homeCtrl', ['$scope', 'otherServices', function ($scope, otherServices) {

	$scope.bookmarks = [];

	otherServices.getUserBookmarks().then(function(res){
		$scope.bookmarks = res.data.bookmarks.reverse();
	},
	function(err){

	});    
    
}]);
