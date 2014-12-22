var LocalStrategy   = require('passport-local').Strategy,
    User = require('../models/user').User,
    Auth = require('../models/user').Auth,
    bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' : email  }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+email);
                        return done(null, false);
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email = email.toLowerCase();
                        newUser.password = createHash(password);
                        newUser.bookmarks = [];
                        
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }

                            require('crypto').randomBytes(16, function(ex, buf){
                                var token = null;
                                token = buf.toString('hex');
                                if(token){
                                    newUser.token = token
                                    var auth = new Auth();
                                    auth.token = token;
                                    auth.save(function(err){
                                        if(err){
                                            return done(null, false);                                    
                                        }
                                        else{
                                            return done(null, newUser);
                                        }
                                    });
                                }
                                else //TODO: need to throw login error only here
                                    return done(null, false);
                            });
                            
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
