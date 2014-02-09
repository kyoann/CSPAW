var usersController = require('./users');
var storiesModel = require('../models/stories');

exports.index = function(req,res) {
	var view ={ title : 'Accueil' };
	view.utilities = require('../views/utilities');
	usersController.addConnexionView(req,view);
	storiesModel.getRecentStories(function(err,stories) {
		view.recentStories = stories.stories;
		res.render('index', view, function(err,stuff) {
			if(!err) {
				res.write(stuff);
				res.end();
			}
		});
	});
}
