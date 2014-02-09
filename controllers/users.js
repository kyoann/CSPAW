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
	user.connexion.user= user;

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
	renderConsultProfil(req.user,res);
};
function renderConsultProfil(user,res) {
	user.connexion = {};	
	user.connexion.user = user;
	user.utilities = require('../views/utilities');

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
	debugger;
	model.addUserEventCommentCommented(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate); 
}
exports.deleteCommentCommentedEvents = function(storyId,username) {
	model.deleteCommentCommentedEvents(storyId,username);
}
