var usersController = require('./users');
var billetsModel = require('../models/billets');
var storiesModel = require('../models/stories');
var utilities = require('./utilities');

exports.index = function(req,res) {
	console.log('cookies:'+JSON.stringify(req.cookies));

	var view ={ title : 'Accueil' };
	view.utilities = require('../controllers/utilities');
	billetsModel.list(function(err,billets) {
		view.billets = billets; 
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
	});
}
