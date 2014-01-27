var usersController = require('./users');

exports.index = function(req,res) {
	console.log("1:"+JSON.stringify(req.user));
	console.log("2:"+JSON.stringify(req.session));
	var view ={ title : 'Accueil' };
	usersController.addConnexionView(req,view);
	res.render('index', view, function(err,stuff) {
		if(!err) {
			res.write(stuff);
			res.end();
		}
	});
}
