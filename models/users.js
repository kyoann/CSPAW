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
