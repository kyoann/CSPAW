var model = require('../models/users');
var storiesModel = require('../models/stories');

exports.new = function(req,res) {
	var view = exports.addConnexionView(req,{});

	res.render('createProfil', view, function(err,stuff) {
		if(!err) {
			res.write(stuff);
			res.end();
		}
	});
}

exports.create = function(req,res) {

	var user = model.createUser(req.body.userId,req.body.password,req.body.age,req.body.hierarchyLevel,req.body.activity,req.body.gender,req.body.studies);

	user.stories = [];

	user.connexion = {};	
	user.connexion.username = user.username;

	res.render('consultProfil',
			user, function(err,stuff) {
				if(!err) {
					res.write(stuff);
					res.end();
				}
			});
};

exports.update = function(req,res) {
};


exports.login = function(req,res) {
	console.log("users.login");
	res.redirect('/');

};

exports.logout = function(req,res) {
	req.logOut();
	res.redirect('/');
};
exports.consult = function(req,res) {
	var username = req.params.username;
	var user = model.findByUsername(username, function(err,user) {
		if(!err) {
			user.connexion = {};	
			user.connexion.username = user.username;

			storiesModel.getUserStories(user.id, function(err,userStories) {
				if(!err) {
					user.stories = userStories;
					res.render('consultProfil',
						   user, function(err,stuff) {
							   if(!err) {
								   res.write(stuff);
								   res.end();
							   }
						   });
				}
			});
		}
	});
};


exports.addConnexionView = function(aReq,aView) {
	aView.connexion = {};	
	if(aReq.user) {
		aView.connexion.username = aReq.user.username;
	}
	console.log(JSON.stringify(aView));
};

