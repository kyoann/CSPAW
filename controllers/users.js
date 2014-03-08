var model = require('../models/users');
var storiesModel = require('../models/stories');
var utilities = require('./utilities');

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
	user.commentsCommented = [];

	user.connexion = {};	
	user.connexion.user= user;

	req.login(user,function(err) {});
	res.render('consultProfil',
			user, function(err,stuff) {
				if(err) {
					console.log(err);
				}
				if(!err) {
					res.write(stuff);
					res.end();
				}
			});
};

exports.update = function(req,res) {
};


exports.login = function(req,res) {
	res.redirect('/');

};

exports.logout = function(req,res) {
	req.logOut();
	res.redirect('/');
};
exports.consult = function(req,res) {
	if(utilities.isModerator(req.user)) {
		renderModeratorPage(req,res);
	}
	else {
		renderConsultProfil(req.user,res);
	}
};
function renderConsultProfil(user,res) {
	user.connexion = {};	
	user.connexion.user = user;
	user.utilities = utilities;


	storiesModel.getUserStories(user.id, function(err,userStories) {
		if(!err) {
			user.stories = userStories;
			model.getUserEventsStoriesCommented(user.username,function(err,events) {
				addEventsToStory(userStories,events);
				model.getUserEventsCommentsCommented(user.username,function(err,commentsCommented){
					user.commentsCommented=commentsCommented;
					res.render('consultProfil',
						   user, function(err,stuff) {
							   if(!err) {
								   res.write(stuff);
								   res.end();
							   }
							   else {
								   console.log(err);
							   }
						   });
				});
			});
		}
	});
}
function renderModeratorPage(req,res) {
	//todo
	renderConsultProfil(req.user,res);

}
function addEventsToStory(stories,events) {
	for(var i = 0,l=stories.length;i < l;i++) {
		stories[i].recentComments = [];
		for(var j=0,m=events.length;j < m;j++){
			if(stories[i].id == events[j].storyid){
				stories[i].recentComments.push(events[j]);
			}
		}
	}
}


exports.addConnexionView = function(aReq,aView) {
	aView.connexion = {};	
	if(aReq.user) {
		aView.connexion.user = aReq.user;
	}
	//console.log(JSON.stringify(aView));
};

exports.addUserEventStoryCommented = function(username,storyid,comment,commentUsername,creationDate) {
	model.addUserEventStoryCommented(username,storyid,comment,commentUsername,creationDate); 
}

exports.deleteStoryCommentedEvents = function(story) {
	model.deleteStoryCommentedEvents(story);
}
exports.addUserEventCommentCommented = function(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate) {
	model.addUserEventCommentCommented(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate); 
}
exports.deleteCommentCommentedEvents = function(storyId,username) {
	model.deleteCommentCommentedEvents(storyId,username);
}
exports.json = {};

exports.json.getUser = function(req,res) {
	debugger;
	res.json({
		username: req.user.username,
		age: req.user.age,
		gender: req.user.gender,
		studies: req.user.studies,
		hierarchyLevel: req.user.hierarchyLevel,
		activity: req.user.activity,
	});
};
