var express = require('express');
var router = express.Router();

var main = require('../controllers/mainCtrl'),
    Auth = require('../models/user').Auth;

var isAuthenticated = function(req, res, next){

	if(req.query.auth_token){
		Auth.findOne({token: req.query.auth_token}, function(err, token){
			if(err){
				res.status(500).json();
				console.log('auth', err);
			}
			else{
				if(token){
					if(req.params.id){
						if((req.params) && (token.user_id !== req.params.user_id)){
							res.status(401).json();
						}
						else if(token.user_id !== req.query.user_id){
							res.status(401).json();	
						}
						else{
							next();
						}
					}
					else{
						next();
					}
				}
				else
					res.status(401).json();
			}
		});
	}
	else{
		res.status(400).json({error:'no auth token'});
	}

}

router.post('/bookmarks/new', isAuthenticated, function(req, res) {
  
	main.addBookmark(req.body.user_id, req.body.url, req.body.tags).then(function(result){
		res.json();
	},
	function(err){
		res.status(500).json();
	});

});


router.get('/bookmarks/all', function(req, res) {
  
	main.getGlobalBookmarks(req.query.page).then(function(result){
		res.json({bookmarks: result});
	},
	function(err){
		res.status(500).json();
	});

});

router.get('/user/bookmarks', isAuthenticated, function(req, res) {
  
	main.getUserBookmarks(req.query.user_id).then(function(result){
		res.json({bookmarks: result});
	},
	function(err){
		res.status(500).json();
	});

});

module.exports = router;
