module.exports = function(passport, LocalStrategy, User){
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	    User.findOne({ username: username }, function(err, user) {
		    console.log(err, user)
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      
	      if (!user.validPassword(password)) {
		      console.log("incorrect password")
	        return done(null, false, { message: 'Incorrect password.'});
	      }
	      return done(null, user);
    });
  }
));

		passport.serializeUser(function(user, done) {
		done(null, user);
		});

		passport.deserializeUser(function(user, done) {
		  done(null, user);
		});



}