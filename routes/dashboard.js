var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userImg = mongoose.model('img');
var User = mongoose.model('User');
var Current = mongoose.model('usernam');



/* GET form. */
router.get('/', function(req, res) {
  userImg.find(function(err, imgData){
    console.log(imgData);
    Current.find(function(err, userdata){
	console.log(userdata, "this is our current user");
    res.render(
      'dashboard',
      {title : 'Dashboard', imgSrc : imgData[0].filename, user : userdata }
    );
     })
    
  });
});

module.exports = router;