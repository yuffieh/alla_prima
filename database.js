var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var crypto = require('crypto');

var Comment = new Schema({
    title : String
});

var userSchema = new Schema({
    fname : String,
    lname: String,
    username: {type: String, unique: true, lowercase:true},
    password: String,
    hash: String,
    salt: String
});



userSchema.methods.setPassword = function(password){
	console.log(this);
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password){
		console.log(this);
		console.log(password, this.hash, this.salt);
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
		console.log(password, hash);
	return this.hash === hash;
};



mongoose.model('comments', Comment);
module.exports.User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/final_database');