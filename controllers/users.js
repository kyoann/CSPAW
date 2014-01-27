var model = require('../models/users');

exports.new = function(req,res) {
	res.render('createUser', function(err,stuff) {
		if(!err) {
			console.log(stuff);
			res.write(stuff);
			res.end();
		}
	});
}

exports.create = function(req,res) {

	var user = model.createUser(req.body.userId,req.body.password,req.body.age,req.body.hierarchyLevel,req.body.activity,req.body.gender,req.body.studies);

	user.stories = [];

	res.render('consultUser',
			userModel2userView(user), function(err,stuff) {
				if(!err) {
					console.log(stuff);
					res.write(stuff);
					res.end();
				}
			});
};

exports.update = function(req,res) {
};



function userModel2userView(aStory) {
	return {storyId:aStory.id,title:aStory.title,facts:aStory.facts,feelings:aStory.feelings,problem:aStory.problem,comments:aStory.comments};
}
var users = [
	{ id: 1, username: 'thi', password: 'ly' }
];


exports.findById = function(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}

exports.findByUsername = function(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

exports.login = function(req,res) {
	console.log("users.login");
	res.redirect('/');

};

exports.logout = function(req,res) {
	req.logOut();
	res.redirect('/');
};

exports.addConnexionView = function(aReq,aView) {
	var connexion;
	aView.connexion = {};	
	if(aReq.user) {
		aView.connexion.username = aReq.user.username;
	}
	console.log(JSON.stringify(aView));
};

