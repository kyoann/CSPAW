var model = require('../models/stories');
var usersController = require('./users');
var usersModel = require('../models/users');

exports.consult = function(req,res) {
	var story = model.getStory(req.params.storyId);
	
	var storyView = storyModel2storyView(story);

	//TODO
	storyView.canBeValidated = false;
	if(story.state == 'new') {
		storyView.canBeValidated = true;
	}
	usersController.addConnexionView(req,storyView);

	res.render('consultStory',
		   storyView, function(err,stuff) {
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });
};
exports.new = function(req,res) {
	var view = {};
	usersController.addConnexionView(req,view);
	res.render('createStory', view, function(err,stuff) {
		if(!err) {
			res.write(stuff);
			res.end();
		}
	});
};
/*
 * comments : id, storyId, author, creationDate, text, responses
 */

exports.create = function(req,res) {
	console.log('creating '+req.body.title+" "+model.createStory);
	var user = usersModel.findByUsername(req.user.username,function(err,user) {
		if(!err) {
		var story = model.createStory(user.id,user.username,new Date(),req.body.title,req.body.facts,req.body.feelings,req.body.problem);

		var storyView = storyModel2storyView(story);
		usersController.addConnexionView(req,storyView);

		//TODO
		storyView.canBeValidated = false;
		if(story.state == 'new') {
			storyView.canBeValidated = true;
		}

		res.render('consultStory',
			   storyView, function(err,stuff) {
				   if(!err) {
					   res.write(stuff);
					   res.end();
				   }
			   });
		}
	});

};

exports.addComment = function(req,res) {
	var storyId = req.body.storyId;
	var commentId = req.body.commentId;
	var comment = req.body.commentText;
	console.log(model.addComment);
	var user = req.user;
	var story = model.addComment(user.username,storyId,commentId,comment);
	var storyView = storyModel2storyView(story);
	usersController.addConnexionView(req,storyView);

	storyView.canBeValidated = true;

	res.render('consultStory',
		   storyView, function(err,stuff) {
			   if(err) {
				   console.log(err);
			   }
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });

		   //res.redirect('/stories/consult');
};
exports.newSpecialistOpinion = function(req,res) {
	console.log("Hello");
	var storyId = req.body.storyId;
	var specialistOpinionText = req.body.newSpecialistOpinionText;

	var story = model.newSpecialistOpinion('Martin',storyId,specialistOpinionText);
	var storyView = storyModel2storyView(story);
	usersController.addConnexionView(req,storyView);

	storyView.canBeValidated = true;

	res.render('consultStory',
		   storyView, function(err,stuff) {
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });

		   //res.redirect('/stories/consult');
};

exports.moderate = function(req,res) {
	var newStories = model.getNewStories();
	var storiesWithCommentsToValidate = model.getStoriesWithCommentsToValidate();
	var storiesWithSpecialistsOpinionsToValidate = model.getStoriesWithSpecialistsOpinionsToValidate();
	var view = {storiesToValidate : newStories, storiesWithCommentsToValidate : storiesWithCommentsToValidate, storiesWithSpecialistsOpinionsToValidate: storiesWithSpecialistsOpinionsToValidate};

	usersController.addConnexionView(req,view);
	res.render('moderate',view
		, function(err,stuff) {
	if(!err) {
		res.write(stuff);
		res.end();
	}
		});
};

exports.validateStory = function(req,res) {
	var storyId = req.body.storyId;
	var storyTitle = req.body.storyTitle;
	var story = model.validateStory(storyId,storyTitle);	
	console.log(story);
	var storyModel =storyModel2storyView(story);
	storyModel.canBeValidated = false;
	usersController.addConnexionView(req,storyModel);
	res.render('consultStory',
		   storyModel, function(err,stuff) {
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });
};
exports.validateComments = function(req,res) {
	var storyId = req.body.storyId;
	var commentsStates = JSON.parse(req.body.commentsStates);
	console.log(commentsStates);
	var story = model.validateComments(storyId,commentsStates);
	var storyModel =storyModel2storyView(story);
	storyModel.canBeValidated = true;
	usersController.addConnexionView(req,storyModel);
	res.render('consultStory',
		   storyModel, function(err,stuff) {
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });

}
exports.searchPrepareForm = function(req,res) {
	var view = {stories:[]};
	usersController.addConnexionView(req,view);
	res.render('searchStory',
		   view, function(err,stuff) {
			   if(err) {
			   	console.log(err);
			   }
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });
}
exports.search = function(req,res) {
	debugger;
	var stories = model.getRecentStories();
	usersController.addConnexionView(req,stories);
	res.render('searchStory',
		   stories, function(err,stuff) {
			   if(err) {
			   	console.log(err);
			   }
			   if(!err) {
				   res.write(stuff);
				   res.end();
			   }
		   });
}

function storyModel2storyView(aStory) {
	return {
		storyId:aStory.id,
		title:aStory.title,
		facts:aStory.facts,
		feelings:aStory.feelings,
		problem:aStory.problem,
		comments:aStory.comments,
		specialistsOpinions:aStory.specialistsOpinions,
		author:aStory.username,
	};
}
