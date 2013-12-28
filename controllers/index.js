exports.index = function(req,res) {
	res.render('index', { title : 'Accueil' }, function(err,stuff) {
		if(!err) {
			console.log(stuff);
			res.write(stuff);
			res.end();
		}
	});
}
