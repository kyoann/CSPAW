var usersController = require('./users');
var storiesModel = require('../models/stories');
var utilities = require('./utilities');

exports.index = function(req,res) {
	var view ={ title : 'Accueil' };
	view.utilities = require('../controllers/utilities');
	usersController.addConnexionView(req,view);
	storiesModel.getRecentStories(
		function(story) {
		if(utilities.canHeRead(story,req.user))
			{
				return false;
			}
			return true;
	},
	function(err,stories) {
		view.recentStories = stories.stories;
		res.render('index', view, function(err,stuff) {
			console.log(err);
			if(!err) {
				res.write(stuff);
				res.end();
			}
		});
	});
}
