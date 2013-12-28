var model = require('./dataModel');

var stories = [];

exports.createStory = function(user,date,title,facts,feelings,problem) {
	console.log('creating '+title+" "+model.story);
	var index = stories.length;

	stories[index] = new model.story(index,title,facts,feelings,problem,user.userid);
	return stories[index];
}
exports.addComment = function (userId,storyId,commentId,text) {
	console.log('adding comment '+commentId);
	var story = getStory(storyId);
	story.version++;
	story.commentsToValidate++;
	var comment = new model.comment(story.version,"Patricia","20131215",text);

	if(commentId.length == 0) {
		console.log("comment root:"+baseComment);
		story.comments.push(comment);
		comment.level = 0;
	}
	else {
		var baseComment = findComment(story.comments,commentId);
		console.log("comment found:"+baseComment);
		if(baseComment == undefined) {
			story.comments.push(comment);
			console.log("comment not found:"+commentId);
			//TODO throw exception
		}
		baseComment.comments.push(comment);
		comment.level = baseComment.level + 1;
	}
	console.log("created comment :"+comment);


	return story;
}
function findComment(comments,commentId) {
	for(var i = 0 ; i < comments.length ; i++) {
		if(comments[i].id == commentId) {
			return comments[i];
		} else {
			return findComment(comments[i].comments,commentId);
		}
	}
}

exports.getNewStories = function() {
	var newStories = [];

	for(var i = 0 ; i < stories.length ; i++) {
		if(story[i].state == 'new') {
			newStories.push(story[i]);
		}
	}
	return newStories;
}
exports.getStoriesWithCommentsToValidate = function() {
	var storiesWithCommentsToValidate = [];

	for(var i = 0 ; i < stories.length ; i++) {
		if(story[i].commentsToValidate != 0) {
			storiesWithCommentsToValidate.push(story[i]);
		}
	}
	return storiesWithCommentsToValidate;
}

exports.searchStories = function() {
	return stories;
}
exports.getStory = function(storyId) {
	for(var i = 0 ; i < stories.length ; i++) {
		if(stories[i].id == storyId) {
			return stories[i];
		}
	}
}

exports.validateStory(storyId,storyTitle) {
	var story = getStory(storyId);
	story.state = "validated";
	story.title = storyTitle;
}
