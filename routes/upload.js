var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
var userImg = mongoose.model('img');
var multer = require('multer');
var maxSize = 32 * 1000 * 1000;


router.get('/', function(req, res, next) {
  res.render('profile',{title : "profile"});
});

router.get('/upload', function(req, res, next) {
  res.render('upload',{title : "Upload"});
});


router.post('/upload', multer({
    dest: './public/userimgs',
    onFileUploadStart: function(file, req, res){
        if(req.file.length > maxSize){
            return false
        }
    }
}).single('profile'), function(req, res, next) {
    var ending;
    if (req.file.mimetype == "image/jpeg") {
        ending = ".jpg";
    } else if (req.file.mimetype == "image/png") {
        ending = ".png";
    } else if(req.file.mimetype == "image/gif"){
	    ending = ".gif"; 
    }else {
        res.redirect('/profile/uploads/');
        fs.unlink(req.file.path);
        return;
    }

    var userpath  = "./public/userimgs/" + req.file.filename + ending;
    fs.rename (req.file.path, userpath);
  new userImg({filename : userpath})
  .save(function(err, filename) {
    console.log(filename)
  });

    res.redirect('/profile/upload');
});


module.exports = router;