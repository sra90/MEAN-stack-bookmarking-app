'use strict';

/**
 * @ngdoc function
 * @name bookmarkApp.controller:signupCtrl
 * @description
 * # signupCtrl
 * Controller of the bookmarkApp
 */

bookmarkApp.controller('signupCtrl', ['$scope', '$location', 'commonService', 'cookieService', '$rootScope', function ($scope, $location, commonService, cookieService, $rootScope) {

	$scope.email = "";
	$scope.password = "";
	$scope.confirm_password = "";
	$scope.errMsg ="";
	$scope.signingup = false;

	$scope.signup = function(){
		
		$scope.errMsg = "";

		if($scope.password && $scope.confirm_password && ($scope.password === $scope.confirm_password) && $scope.email && (/.+@.+\..+/.test($scope.email))){

			$scope.signingup = true;

			var data = {
				email: $scope.email,
				password: $scope.password,
			};

			commonService.signUp(data).then(function(res){
				cookieService.setCookie({id:res.data.user_id,email: res.data.email, tok: res.data.auth_token});
				$rootScope.loggedIn = true;
				$rootScope.curUser = res.data.email;
				$scope.signingup = false;
				$location.path('home');
			},
			function(err){
				$scope.signingup = false;
				$scope.errMsg = "Sorry, we are unable to sign you up. Please try again.";
			});

		}
		else{
			if($scope.password !== $scope.confirm_password)
				$scope.errMsg = "Your passwords do not match";
			else 
				$scope.errMsg = "Kindly check your details. All fields above are mandatory.";
		}
			
	}
    
    
}]);
