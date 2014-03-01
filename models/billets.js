var model = require('./dataModel');
var billets = [];
billets[0] = new model.billet(0,"titre billet 1","texte billet 1",new Date());
billets[1] = new model.billet(1,"titre billet 2","texte billet 2",new Date());


exports.create = function(billet,done) {
	var index = billets.length;

	billets[index] = new model.billet(index,billet.title,billet.text,new Date());
	done(null,billets[index]);
}
exports.update = function(billet,done) {
	var index = billet.id;

	billets[index] = billet;
	done(null);
}
exports.list = function(done) {
	done(null,billets);
}
