'use strict';

bookmarkApp.factory('otherServices',['$http', 'apiURL', 'cookieService', function($http, apiURL, cookieService){

	return {

		getPopularBookmarks: function(page){

			return $http({
				method: 'GET',
				url: apiURL+'bookmarks/all',
				params: {
					page: page || 1
				}
			});

		},

		getUserBookmarks: function(){

			return $http({
				method: 'GET',
				url: apiURL+'user/bookmarks',
				params: {
					auth_token: cookieService.getAuth(),
					user_id: cookieService.getUserId()
				}
			});

		},

		newBookmark: function(url, tags){
			
			return $http({
				method: 'POST',
				url: apiURL+'bookmarks/new?auth_token='+cookieService.getAuth(),
				data: {
					user_id: cookieService.getUserId(),
					url: url,
					tags: tags
				}
			});

		}

	};

}]);
