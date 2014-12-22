'use strict';

bookmarkApp.factory('commonService',['$http', 'apiURL', 'cookieService', function($http, apiURL, cookieService){

	return {

		login: function(email, password){

			return $http({
				method: 'POST',
				url: apiURL+'login',
				data: {email:email,password:password}
			});

		},

		/*
			data = {
				email: value,
				password: value
			}
		*/
		signUp: function(data){

			return $http({
				method: 'POST',
				url: apiURL+'signup',
				data: data
			});	

		},

		logout: function(){

			return $http({
				method: 'DELETE',
				url: apiURL+'logout?auth_token='+ cookieService.getAuth()
			});

		}

	};

}]);


		
