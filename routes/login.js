var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var crypto = require('crypto');


/* load login page. */
router.get('/', function(req, res) {
    res.render('login', {title : 'login'});
    
  });
  

router.post('/', passport.authenticate('local', { failureRedirect: '/login'}),
	function(req,res){
		res.redirect('/dashboard');
	}
);

/*
router.post('/', function(req, res, next){
console.log("something else here")
	passport.authenticate('local', function(err, user, info){
		console.log("something", user)
		if(err){
			console.log(err);
			return;
		}
		if(!user){
			res.redirect('/login');
			return;
		}
		req.logIn(user, function(err){
			if(err){ return next(err);}
			return res.redirect('/users/' + user.username)
		});
		
		})(req, res, next)
});
*/







module.exports = router;
