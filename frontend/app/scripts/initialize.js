'use strict';

bookmarkApp.run(['$rootScope', '$location','cookieService', 'commonService', function($rootScope, $location, cookieService, commonService){

	$rootScope.loggedIn = false;

	//if logged in
	if(cookieService.getUserId()){
		$rootScope.loggedIn = true;
		$rootScope.curUser = cookieService.getUserEmail();
	}

	$rootScope.$on('event:logout', function(e, state, role){

		commonService.logout(cookieService.getAuth()).then(function(res){
			cookieService.clearCookie();
			$rootScope.loggedIn = false;
			$location.path('/');
		},
		function(err){
			console.error('logout', err);
		});

	});
	
	$rootScope.$on('$locationChangeStart', function(event, current, next){
		
		if(current && next){

			if(current){
				next = current;
			}
			else{
				next = next;
			}
			
			if(cookieService.getUserId()){
				
				if(next.split('/')[3] === ''){
				
					$location.path('/home');
				
				}

			}
			else if(($location.path() !== '/')&&($location.path() !== '/signup')&&($location.path() !== '/login')){
				$location.path('/');
			}

		}

	});

	$rootScope.logout = function(){

		$rootScope.$emit('event:logout');

	}

}]);
