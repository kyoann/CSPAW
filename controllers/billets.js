var billetsModel = require('../models/billets');
var usersController = require('./users');

exports.billets = function(req,res) {
	var view ={ };
	usersController.addConnexionView(req,view);
	res.render('billets',view,function(err,stuff){
		console.log(err);
		if(!err) {
			res.write(stuff);
			res.end();
		}
	});
}

exports.list = function(req,res) {
	console.log('cookies:'+JSON.stringify(req.cookies));
	console.log('user:'+JSON.stringify(req.user));
	billetsModel.list(function(err,billets){
		if(err) {
			console.log(err);
			return;
		}
		res.json(billets);
	});
}
exports.create = function(req,res) {
	console.log(req.body);
	console.log(req.signedCookies);
	billetsModel.create(req.body,function(err,billet){
		if(err) console.log(err);
		res.end();
	});
}
exports.update = function(req,res) {
	billetsModel.update(req.body,function(err){
		if(err) console.log(err);
		res.end();
	});
}

