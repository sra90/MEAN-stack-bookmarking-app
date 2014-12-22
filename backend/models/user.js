var mongoose = require('mongoose');

module.exports.Auth = mongoose.model('AuthTokens',{
	token: String,
	user_id: String
});

module.exports.User = mongoose.model('User',{
	email: String,
	password: String,
	bookmarks: [{url: String, tags: [String]}]
});

module.exports.Bookmarks = mongoose.model('Bookmarks',{
	url: String,
	popularity: Number //increment with each save
});
