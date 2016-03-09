var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var maxSize = 32 * 1000 * 1000;


router.get('/', function(req, res, next) {
  res.render('profile',{title : "profile"});
});

router.get('/upload', function(req, res, next) {
  res.render('upload',{title : "Upload"});
});


router.post('/upload', multer({
    dest: './uploads',
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
    } else {
        res.redirect('/profile/uploads/');
        fs.unlink(req.file.path);
        return;
    }

    var userpath  = "./userimgs/" + req.file.filename + ending;
    fs.rename (req.file.path, userpath);
//also write userpath into database so you can recall it later
    res.redirect('/profile/upload');
});


module.exports = router;