module.exports = function(passport, LocalStrategy, User){
	console.log("file included");
	passport.use(new LocalStrategy(
  function(username, password, done) {
	  console.log("HELP ME!")
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
}