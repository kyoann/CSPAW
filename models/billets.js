var model = require('./dataModel');
var billets = [];
billets[0] = new model.billet(0,"Un peu de géopolitique","Un article sur la <a href='http://www.lemonde.fr/europe/article/2014/03/03/ukraine-a-donetsk-des-manifestants-prorusses-occupent-l-assemblee-regionale_4376925_3214.html'>situation en Ukraine </a>",new Date());
billets[1] = new model.billet(1,"titre billet 2","texte billet 2",new Date());


exports.create = function(billet,done) {
	var index = billets.length;

	billets[index] = new model.billet(index,billet.title,billet.text,new Date());
	done(null,billets[index]);
}
exports.update = function(billet,done) {
	var index = billet.id;

	var creationDate = billets[index].creationDate;
	billets[index] = billet;
	billets[index].creationDate = creationDate;
	done(null);
}
exports.list = function(done) {
	done(null,billets);
}
