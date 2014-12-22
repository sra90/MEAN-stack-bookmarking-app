var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user').User;
var Auth = require('../models/user').Auth;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    
	passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) { 
            // check in mongo if a user with username exists or not
            User.findOne({ 'email' :  email.toLowerCase() }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+email);
                        return done(null, false);                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    require('crypto').randomBytes(16, function(ex, buf){
                        var token = null;
                        token = buf.toString('hex');
                        if(token){
                            user.token = token;
                            var auth = new Auth();
                            auth.token = token;
                            auth.user_id = user.id;
                            auth.save(function(err){
                                if(err){
                                    return done(null, false);                                    
                                }
                                else{
                                    return done(null, user);
                                }
                            });
                        }
                        else
                            return done(null, false);
                    });
                    
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
