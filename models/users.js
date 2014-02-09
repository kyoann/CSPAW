var model = require('./dataModel');


var users = [
	new model.user(1,'Thi','Ly','35','Cadre','Avocat','F','Bac +5',{},['moderator']),
	new model.user(2,'u1','u1','35','Cadre','Avocat','F','Bac +5',{},['user']),
	new model.user(3,'u2','u2','35','Cadre','Avocat','F','Bac +5',{},['user']),
	new model.user(4,'s1','s1','35','Cadre','Avocat','F','Bac +5',{},['specialist']),

];
exports.createUser = function(username,password,age,hierarchyLevel,activity,gender,studies)
{
	var idx = users.length;
	var user = new model.user(idx,username,password,age,hierarchyLevel,activity,gender,studies,['user']);
	users[idx] = user;
	return user;
};

exports.findById = function(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}
exports.findByUsername = function(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

var storyCommentedEvents = [];
var commentCommentedEvents = [];

exports.addUserEventStoryCommented = function(username,storyid,comment,commentUsername,creationDate) {
	var event = new model.storyCommentedEvent(username,storyid,comment,commentUsername,creationDate); 
	storyCommentedEvents.push(event);
}
exports.getUserEventsStoriesCommented = function(username,done) {
	var events = [];
	for(var i = 0;i<storyCommentedEvents.length;i++){
		if(storyCommentedEvents[i].username === username) {
			events.push(storyCommentedEvents[i]);
		}
	}
	done(null,events);
}
exports.deleteStoryCommentedEvents = function(story) {
	for(var i = 0;i<storyCommentedEvents.length;i++){
		if(storyCommentedEvents[i].username === story.username) {
			storyCommentedEvents.splice(i,1);
		}
	}
}
exports.addUserEventCommentCommented = function(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate) {
	var event = new model.commentCommentedEvent(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate); 
	commentCommentedEvents.push(event);
}
exports.getUserEventsCommentsCommented = function(username,done) {
debugger;
	var events = [];
	console.log(commentCommentedEvents);
	for(var i = 0;i<commentCommentedEvents.length;i++){
		if(commentCommentedEvents[i].commentedCommentUsername === username) {
			events.push(commentCommentedEvents[i]);
		}
	}
	done(null,events);
}
exports.deleteCommentCommentedEvents = function(storyId,username) {
	for(var i = 0;i<commentCommentedEvents.length;i++){
		if(commentCommentedEvents[i].storyId === storyId && commentCommentedEvents[i].commentedCommentUsername === username) {
			commentCommentedEvents.splice(i,1);
		}
	}
}
