var model = require('../models/stories');
var usersController = require('./users');
var usersModel = require('../models/users');
var utilities = require('../controllers/utilities');

function renderConsult(story,req,res) {
	var storyView = storyModel2storyView(story);

	//TODO
	storyView.canBeValidated = false;
	if(story.state == 'new') {
		storyView.canBeValidated = true;
	}
	usersController.addConnexionView(req,storyView);
	storyView.utilities = utilities;

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
		   if(req.user && req.user.username == story.username) {
			   usersController.deleteStoryCommentedEvents(story);
		   }
		   if(req.user) {
			   usersController.deleteCommentCommentedEvents(story.id,req.user.username);
		   }

}
exports.consult = function(req,res) {
	var story = model.getStory(req.params.storyId);
	renderConsult(story,req,res);

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
function urlDecodeWTF(e) {
	var d = e.replace("+"," ");
	d = unescape(d);
	return d;

}

exports.create = function(req,res) {
	var user = usersModel.findByUsername(req.user.username,function(err,user) {
		if(!err) {
			console.log(req.body.facts);
			var facts = urlDecodeWTF(req.body.facts);
			console.log(facts);
			var story = model.createStory(user.id,user.username,new Date(),req.body.title,facts,req.body.feelings,req.body.problem);
			renderConsult(story,req,res);
		}
	});

};

exports.addComment = function(req,res) {
	var storyId = req.body.storyId;
	var commentId = req.body.commentId;
	var comment = req.body.commentText;
	var user = req.user;
	var storyUsername = req.body.storyUsername;
	var currentDate = new Date();
	var story = model.getStory(storyId);
	story.version++;
	story.commentsToValidate++;
	var comment = model.newComment(story.version,user.username,new Date(),comment);
	var baseComment; 
	if(commentId.length === 0) {
		story.comments.push(comment);
		comment.level = 0;
	}
	else {
		baseComment = findComment(commentId,story.comments);
		if(baseComment === undefined) {
			//TODO throw exception
		}
		baseComment.comments.push(comment);
		comment.level = baseComment.level + 1;
	}
	model.updateStory(story,function(err){});

	usersController.addUserEventStoryCommented(storyUsername,story.id,comment,user.username,currentDate);
	if(baseComment) {
		usersController.addUserEventCommentCommented(story.title,story.id,baseComment.author,comment.author,baseComment.text,comment.text,currentDate);
	}

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
function findComment(aCommentId,aComments) {
	for(var i = 0 ; i < aComments.length ; i++) {
		if(aComments[i].id == aCommentId ) {
			return aComments[i];
		}	
		else {
			var comment = findComment(aCommentId,aComments[i].comments);
			if(comment != undefined) {
				return comment;
			}
		}
	}
	return undefined;
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
	var action = req.body.action;
	var storyState;
	if(action === 'publish') {
		storyState = 'validated';
	}
	else {
		storyState = 'new';
	}
	var story = model.validateStory(storyId,storyTitle,storyState);	

	renderConsult(story,req,res);
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
	model.getRecentStories(function(err,stories) {
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
	});
}

function formatString(s) {
	var f = s.replace('\r\n','<br>');
	return f;
}

function storyModel2storyView(aStory) {
	return {
		storyId:aStory.id,
		title:formatString(aStory.title),
		facts:formatString(aStory.facts),
		feelings:formatString(aStory.feelings),
		problem:formatString(aStory.problem),
		comments:aStory.comments,
		specialistsOpinions:aStory.specialistsOpinions,
		author:aStory.username,
		themes:aStory.themes,
		state:aStory.state,
	};
}
