'use strict';

/**
 * @ngdoc function
 * @name bookmarkApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the bookmarkApp
 */

bookmarkApp.controller('loginCtrl', ['$scope', 'commonService', 'cookieService', '$location', '$rootScope', function ($scope, commonService, cookieService, $location, $rootScope) {

	$scope.email = "";
	$scope.password = "";
	$scope.errMsg ="";
	$scope.loggingin = false;
	
	$scope.login = function(){

		$scope.errMsg ="";
		if($scope.email && $scope.password && (/.+@.+\..+/.test($scope.email))){

			$scope.loggingin = true;
			commonService.login($scope.email, $scope.password).then(function(res){
				cookieService.setCookie({id:res.data.user_id,email: res.data.email, tok: res.data.auth_token});
				$rootScope.loggedIn = true;
				$rootScope.curUser = res.data.email;
				$location.path('home');
			},
			function(err){
				$scope.loggingin = false;
				$scope.errMsg = "Unable to login, please check your credentials.";
			});

		}
		else{
			$scope.errMsg = "Please enter all details correctly.";
		}

	}
    
    
}]);
