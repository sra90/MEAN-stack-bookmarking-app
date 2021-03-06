var login = require('./login'),
    signup = require('./signup'),
    User = require('../models/user').User;

module.exports = function(passport){
    
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp
    login(passport);
    signup(passport);

}
