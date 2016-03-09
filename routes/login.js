var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Current = mongoose.model('usernam');
var passport = require('passport');
var crypto = require('crypto');


/* load login page. */
router.get('/', function(req, res) {
    res.render('login', {title : 'login'});
    
  });
  



router.post('/', function(req, res, next){
console.log("something else here")
	passport.authenticate('local', function(err, user, info){
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
			Current.find( console.log(Current))
			  Current.update({userName : req.body.username})
			  console.log(user)
			  console.log("above is the current user")

			return res.redirect('/dashboard')
		});
		
		})(req, res, next)
});








module.exports = router;
