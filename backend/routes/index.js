var express = require('express');
var router = express.Router();
var logout = require('../controllers/mainCtrl').logout;

module.exports = function(passport){

	router.get('/', function(req, res) {
	  res.send('Welcome to The BookMark App');
	});

	router.post('/login',passport.authenticate('login'),function(req, res){
		
		res.json({user_id: req.user._id,email: req.user.email, auth_token: req.user.token});

	});

	//Passport will establish a persistent login session if not disabled
	router.post('/signup',passport.authenticate('signup'),function(req, res){
		
		res.json({user_id: req.user.id, email: req.user.email, auth_token: req.user.token});
		
	});

	router.delete('/logout', function(req, res){

		if(req.query.auth_token){
			logout(req.query.auth_token).then(function(result){
				res.json();
			},
			function(err){
				res.status(401).json({error:'invalid auth token'});
			});
		}
		else{
			res.status(400).json({error: 'no auth token'});
		}

	});

	return router;

}
