var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userImg = mongoose.model('img');
var Comment = mongoose.model('comments');



/* GET form. */
router.get('/', function(req, res) {
  Comment.find(function(err, comments){
    console.log(comments);
    userImg.find(function(err, imgData){
    res.render('form',{title : 'viewimagepage', comments : comments, imgSrc : imgData[0].filename });
  })
  });
  
});

/* POST form. */
router.post('/', function(req, res) {
  new Comment({title : req.body.comment})
  .save(function(err, comment) {
    console.log(comment)
    res.redirect('form');
  });
});

module.exports = router;