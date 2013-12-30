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
