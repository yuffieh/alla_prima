var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render(
      'users',
      {title : "userlist"}
    );
});


/* POST form. */
router.post('/', function(req, res) {

 var u = new User({fname : req.body.fnam,
	lname: req.body.lnam,
    username: req.body.username
  });
  u.setPassword(req.body.password);
  u.save(function(err, user) {
    console.log('a', user)
    res.redirect('login');
  });
});

/*
router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		res.send(400);
	}
	//
});
*/

module.exports = router;
