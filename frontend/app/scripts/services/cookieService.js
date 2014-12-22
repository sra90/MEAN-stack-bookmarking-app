'use strict';

bookmarkApp.factory('cookieService',['$cookies', function($cookies){

	return {

		setCookie: function(data){
			$cookies.user_id = data.id;
			$cookies.user_email = data.email;
			$cookies.tok = data.tok;
		},

		getUserId: function(){
			return $cookies.user_id;
		},

		getUserEmail: function(){
			return $cookies.user_email;
		},

		getAuth: function(){
			return $cookies.tok;
		},

		clearCookie: function(){
			delete $cookies.tok;
			delete $cookies.user_id;
			delete $cookies.user_email;
		}

	};

}]);


		
