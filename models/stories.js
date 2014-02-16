var model = require('./dataModel');

var stories = [];

var temp = new model.story(0,"histoire de test","Faits","Ressenti","Problème",5,new Date(),'u');
temp.state = "validated";
stories.push(temp);

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
	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].id == storyId) {
			return stories[i];
		}
	}
};
exports.getStoryAsync = function(storyId,done) {
	var story = exports.getStory(storyId);
	done(null,story);
}

exports.validateStory = function(storyId,storyTitle,storyState) {
	var story = exports.getStory(storyId);
	story.state = storyState;
	story.title = storyTitle;
	return story;
};

exports.validateComments = function(storyId,commentsStates) {
	var story = exports.getStory(storyId);
	story.commentsToValidate = 0;
	var f = function(aComment) {
		var state = commentsStates[aComment.id];
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
    
	return story;	
};

function commentsIterator(aComments, aFunction) {
	for(var i = 0 ; i < aComments.length ; i++) {
		commentsIterator(aComments[i].comments, aFunction);
		aFunction(aComments[i]);
	}
}
exports.getRecentStories = function(filter,done) {
	var recentStories = [];
	for(var i = 0 ; i < stories.length ; i++) {
		if(!filter(stories[i])) {
			recentStories.push(stories[i]);
		}
	}
	done(null,{stories:recentStories});
}
