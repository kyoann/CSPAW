var model = require('./dataModel');

var stories = [];

exports.createStory = function(userId,username,date,title,facts,feelings,problem) {
	var index = stories.length;

	stories[index] = new model.story(index,title,facts,feelings,problem,userId,date,username);
	console.log("hello1");
	return stories[index];
};
exports.getUserStories = function(userId,done) {
	debugger;
	var userStories = [];
	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].userId === userId) {
			userStories.push(stories[i]);		
		}
	}
	done(null,userStories);
}

exports.newSpecialistOpinion = function(userId,storyId,specialistOpinionText) {
	var story = exports.getStory(storyId);
	story.version++;
	story.specialistsOpinionsToValidate++;
	var specialistOpinion = new model.specialistOpinion(story.version,"L'avis de Jean Malaury, anthropo-geographe",new Date(),specialistOpinionText);

	story.specialistsOpinions.push(specialistOpinion);

	return story;
};
exports.newComment = function(version,username,date,text) {
	return new model.comment(version,username,date,text);
};
exports.updateStory = function(story,done) {
	done(null);
}


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
exports.getRecentStories = function(done) {
	done(null,{stories:stories});
}
