'use strict';

bookmarkApp.filter('modifyUrl', function(){
	return function(url){
		if(!(/.+:.*\/\/(\/)?.+/.test(url))){
		
			url = "http://" + url;
			return url;
			
		}

		return url;
	};
});
