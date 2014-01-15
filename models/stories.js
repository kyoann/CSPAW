var model = require('./dataModel');

var stories = [];

exports.createStory = function(userId,date,title,facts,feelings,problem) {
	var index = stories.length;

	stories[index] = new model.story(index,title,facts,feelings,problem,userId,date);
	console.log("hello1");
	return stories[index];
};

exports.newSpecialistOpinion = function(userId,storyId,specialistOpinionText) {
	var story = exports.getStory(storyId);
	story.version++;
	story.specialistsOpinionsToValidate++;
	var specialistOpinion = new model.specialistOpinion(story.version,"L'avis de Jean Malaury, anthropo-geographe",new Date(),specialistOpinionText);

	story.specialistsOpinions.push(specialistOpinion);

	return story;
};
	
exports.addComment = function (userId,storyId,commentId,text) {
	console.log('adding comment '+commentId);
	var story = exports.getStory(storyId);
	story.version++;
	story.commentsToValidate++;
	var comment = new model.comment(story.version,"Patricia","20131215",text);

	if(commentId.length === 0) {
		console.log("comment root:"+baseComment);
		story.comments.push(comment);
		comment.level = 0;
	}
	else {
		var baseComment = findComment(commentId,story.comments);
		if(baseComment === undefined) {
			//TODO throw exception
		}
		baseComment.comments.push(comment);
		comment.level = baseComment.level + 1;
	}

	console.log(story);
	return story;
};
function findComment(aCommentId,aComments) {
	for(var i = 0 ; i < aComments.length ; i++) {
		console.log("comparing "+aComments[i].id+" with "+aCommentId);
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

exports.getNewStories = function() {
	var newStories = [];

	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].state == 'new') {
			newStories.push(stories[i]);
		}
	}
	return newStories;
};
exports.getStoriesWithCommentsToValidate = function() {
	var storiesWithCommentsToValidate = [];

	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].commentsToValidate !== 0) {
			storiesWithCommentsToValidate.push(stories[i]);
		}
	}
	return storiesWithCommentsToValidate;
};
exports.getStoriesWithSpecialistsOpinionsToValidate = function() {
	var storiesWithSpecialistsOpinionsToValidate = [];

	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].specialistsOpinionsToValidate !== 0) {
			storiesWithSpecialistsOpinionsToValidate.push(stories[i]);
		}
	}
	console.log(storiesWithSpecialistsOpinionsToValidate.length + "stories with so to validate");

	return storiesWithSpecialistsOpinionsToValidate;
};
exports.searchStories = function() {
	return stories;
};
exports.getStory = function(storyId) {
	console.log("getStory:"+storyId);
	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].id == storyId) {
			console.log("getStory:"+storyId+" found");
			return stories[i];
		}
	}
};

exports.validateStory = function(storyId,storyTitle) {
	var story = exports.getStory(storyId);
	story.state = "validated";
	story.title = storyTitle;
	return story;
};

exports.validateComments = function(storyId,commentsStates) {
	var story = exports.getStory(storyId);
	story.commentsToValidate = 0;
	var f = function(aComment) {
		console.log("visiting comment:"+aComment.id);
		var state = commentsStates[aComment.id];
		console.log("new comment state:"+state);
		if(state == undefined){
			return;
		} 
		else {
			if(state=='red') {
				aComment.state = 'refused';
			}
			if(state=='green') {
				aComment.state = 'validated';
			}
			if(state=='blue') {
				aComment.state = 'toBeValidated';
			}
		}
		if(aComment.state == 'toBeValidated') {
			story.commentsToValidate++;
		}
		console.log("commentsToValidate:"+story.commentsToValidate);
	}
	commentsIterator(story.comments,f);
	/*
	   for(var commentId in commentsStates) {
	   console.log("looking for comment:"+storyId+"/"+commentId);
	   var comment = findComment(commentId,story.comments);
	   if(comment == undefined) {
	   console.log("unfound comment:"+storyId+"/"+commentId);
	   continue;
	   }
	   else {
	   console.log("found");
	   }
	   if(commentsStates[commentId]=='red') {
	   comment.state = 'refused';
	   }
	   if(commentsStates[commentId]=='green') {
	   comment.state = 'validated';
	   }
	   if(commentsStates[commentId]=='blue') {
	   comment.state = 'toBeValidated';
	   }
	   }
	   return story;
	   */
	return story;	
};

function commentsIterator(aComments, aFunction) {
	for(var i = 0 ; i < aComments.length ; i++) {
		commentsIterator(aComments[i].comments, aFunction);
		aFunction(aComments[i]);
	}
}
