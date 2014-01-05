var model = require('./dataModel');

var stories = [];

exports.createStory = function(userId,date,title,facts,feelings,problem) {
	console.log('creating '+title+" "+model.story);
	var index = stories.length;

	stories[index] = new model.story(index,title,facts,feelings,problem,userId,new Date());
	return stories[index];
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
		var baseComment = findComment(story.comments,commentId);
		if(baseComment === undefined) {
			//TODO throw exception
		}
		baseComment.comments.push(comment);
		comment.level = baseComment.level + 1;
	}

	console.log(story);
	return story;
};
function findComment(comments,commentId) {
	for(var i = 0 ; i < comments.length ; i++) {
		if(comments[i].id == commentId) {
			return comments[i];
		} else {
			var comment = findComment(comments[i].comments,commentId);
			if(comment !== undefined) {
				return comment;
			}
		}
	}
	return undefined;
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
