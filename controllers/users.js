var model = require('../models/users');

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

	var view = userModel2userView(user);
	view.connexion = {};	
	view.connexion.username = user.id;

	res.render('consultProfil',
			view, function(err,stuff) {
				if(!err) {
					res.write(stuff);
					res.end();
				}
			});
};

exports.update = function(req,res) {
};



function userModel2userView(aUser) {
	return {
		userId:aUser.id,
		age:aUser.age,
		gender:aUser.age,
		studies:aUser.studies,
		hierarchyLevel:aUser.hierarchyLevel,
		activity:aUser.activity
	};
}
var users = [
	{ id: 1, username: 'Thi', password: 'Ly' },
	{ id: 2, username: 'a', password: 'a' }
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
	aView.connexion = {};	
	if(aReq.user) {
		aView.connexion.username = aReq.user.username;
	}
	console.log(JSON.stringify(aView));
};

