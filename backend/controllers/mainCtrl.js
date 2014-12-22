var Q = require('q');
var ObjectId = require('mongoose').Types.ObjectId;
var user = require('../models/user').User;
var global_bookmarks = require('../models/user').Bookmarks;

exports.logout = function(auth_token){

	var deferred = new Q.defer();

	var Auth = require('../models/user').Auth;
	Auth.remove({'token': auth_token}, function(err, done){
		if(err){
			deferred.reject(new Error(err));
		}
		else{
			if(done)
				deferred.resolve();
			else
				deferred.reject();
		}
	});
	
	return deferred.promise;
}

exports.addBookmark = function(user_id, url, tags){

	var deferred = new Q.defer();

	var bookmark = {
		url: url,
		tags: tags.split(',')
	}

	user.update({id: (new ObjectId(user_id))}, {$pushAll:{bookmarks: [bookmark]}},{upsert:true}, function(err, updated){
		if(err){
			deferred.reject(new Error(err));
			console.log('db err');
		}
		else if(updated){
			//update global bookmarks
			global_bookmarks.find({url: url}, function(err, bookmark){
				if(err){
					console.error(err);
				}
				else{
					
					if(bookmark[0]){
						bookmark[0].popularity = parseInt(bookmark[0].popularity) + 1;

						bookmark[0].save(function(err){

							if(err){
								console.error(err);
							}
							else{

							}

						});
					}
					else{
						var new_bookmark = new global_bookmarks();
						new_bookmark.url = url;
						new_bookmark.popularity = 1;
					
						new_bookmark.save(function(err){
                            if(err){
                                console.error(err);
                            }
                            else{
                                
                            }
                        });
					}
				}
			});
			deferred.resolve();
		}
		else{
			deferred.reject();
		}

	});

	return deferred.promise;

}

exports.getUserBookmarks = function(user_id){

	var deferred = new Q.defer();

	user.find({id: (new ObjectId(user_id))}, function(err, usr){

		if(err){
			console.error(err);
			deferred.reject(new Error(err));
		}
		else{
			if(usr[0]){
				deferred.resolve(usr[0].bookmarks);
			}
			else
				deferred.reject();
		}
	});

	return deferred.promise;

}

exports.getGlobalBookmarks = function(page){

	var deferred = new Q.defer();

	global_bookmarks.find({}, null, {sort: {popularity: -1}, limit: (page*10)},function(err, bookmarks){
		if(err){
			console.error(err);
			deferred.reject(new Error(err));
		}
		else{
			deferred.resolve(bookmarks);
		}
	});

	return deferred.promise;

}
