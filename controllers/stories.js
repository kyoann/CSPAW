var model = require('../models/stories');

exports.index = function(req,res) {
	//var filepath = require('path').normalize(__dirname + '/../views/index.htm');
	//console.log(filepath);
	//res.sendfile(filepath);
	res.render('index', { title : 'Accueil' }, function(err,stuff) {
		if(!err) {
			console.log(stuff);
			res.write(stuff);
			res.end();
		}
	});
}
exports.consult = function(req,res) {
	var story = model.getStory(req.body.storyId);
	
	res.render('consultStory',
			storyModel2storyView(story), function(err,stuff) {
				if(!err) {
					console.log(stuff);
					res.write(stuff);
					res.end();
				}
			});
}
exports.new = function(req,res) {
	res.render('createStory', function(err,stuff) {
		if(!err) {
			console.log(stuff);
			res.write(stuff);
			res.end();
		}
	});
}
/*
 * comments : id, storyId, author, creationDate, text, responses
 */

exports.create = function(req,res) {
	console.log('creating '+req.body.title+" "+model.createStory);

	var story = model.createStory(null,null,req.body.title,req.body.facts,req.body.feelings,req.body.problem,{userid='martin'});

	var storyView = storyModel2storyView(story);

	//TODO
	storyView.canBeValidated = true;

	res.render('consultStory',
			storyView, function(err,stuff) {
				if(!err) {
					console.log(stuff);
					res.write(stuff);
					res.end();
				}
			});
}

exports.update = function(req,res) {
	var userId = req.body.userId;
	var storyId = req.body.storyId;
	var commentId = req.body.commentId;
	var comment = req.body.commentText;
	console.log(model.addComment);
	var story = model.addComment(userId,storyId,commentId,comment);
	res.render('consultStory',
			storyModel2storyView(story), function(err,stuff) {
				if(!err) {
					console.log(stuff);
					res.write(stuff);
					res.end();
				}
			});
}

exports.getStoriesToModerate = function(req,res) {
	var newStories = model.getNewStories();
	var storiesWithCommentsToValidate = model.getStoriesWithCommentsToValidate();
	res.render('moderate',
		   {stories = newStories, storiesWithCommentsToValidate = storiesWithCommentsToValidate}, function(err,stuff) {
				if(!err) {
					console.log(stuff);
					res.write(stuff);
					res.end();
				}
			});

}

exports.validateStory = function(req,res) {
	var storyId = req.body.storyId;
	var storyTitle = req.body.storyTitle;
	model.validateStory(storyId,storyTitle);	
}

function storyModel2storyView(aStory) {
	return {storyId:aStory.id,title:aStory.title,facts:aStory.facts,feelings:aStory.feelings,problem:aStory.problem,comments:aStory.comments};
}
