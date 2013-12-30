var model = require('../models/stories');

exports.consult = function(req,res) {
	var story = model.getStory(req.body.storyId);
	
	//TODO
	storyView.canBeValidated = false;
	if(story.state == 'new') {
		storyView.canBeValidated = true;
	}
	res.render('consultStory',
		   storyModel2storyView(story), function(err,stuff) {
			   if(!err) {
				   console.log(stuff);
				   res.write(stuff);
				   res.end();
			   }
		   });
};
exports.new = function(req,res) {
	res.render('createStory', function(err,stuff) {
		if(!err) {
			console.log(stuff);
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

	var story = model.createStory('Martin',new Date(),req.body.title,req.body.facts,req.body.feelings,req.body.problem);

	var storyView = storyModel2storyView(story);

	//TODO
	storyView.canBeValidated = false;
	if(story.state == 'new') {
		storyView.canBeValidated = true;
	}

	res.render('consultStory',
		   storyView, function(err,stuff) {
			   if(!err) {
				   console.log(stuff);
				   res.write(stuff);
				   res.end();
			   }
		   });
};

exports.addComment = function(req,res) {
	console.log("Hello");
	var storyId = req.body.storyId;
	var commentId = req.body.commentId;
	var comment = req.body.commentText;
	console.log(model.addComment);
	//TODO
	var story = model.addComment('Martin',storyId,commentId,comment);
	var storyView = storyModel2storyView(story);
	console.log(storyView);

	storyView.canBeValidated = false;
	res.render('consultStory',
		   storyView, function(err,stuff) {
			   if(!err) {
				   console.log(stuff);
				   res.write(stuff);
				   res.end();
			   }
		   });
};

exports.getStoriesToModerate = function(req,res) {
	var newStories = model.getNewStories();
	var storiesWithCommentsToValidate = model.getStoriesWithCommentsToValidate();
	res.render('moderate',
		   {stories : newStories, storiesWithCommentsToValidate : storiesWithCommentsToValidate}, function(err,stuff) {
			   if(!err) {
				   console.log(stuff);
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
	//HERE : page do not render if false
	storyModel.canBeValidated = false;
	res.render('consultStory',
		   storyModel, function(err,stuff) {
			   if(!err) {
				   console.log(stuff);
				   res.write(stuff);
				   res.end();
			   }
		   });
};

function storyModel2storyView(aStory) {
	return {storyId:aStory.id,title:aStory.title,facts:aStory.facts,feelings:aStory.feelings,problem:aStory.problem,comments:aStory.comments};
}
