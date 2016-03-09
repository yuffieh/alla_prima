var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



/* GET form. */
router.get('/', function(req, res) {
    res.render( 'Gallery', {title : 'Gallery'} );

});

module.exports = router;