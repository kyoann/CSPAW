var model = require('./dataModel');

var stories = [];

exports.createUser = function(userId,password,age,hierarchyLevel,activity,gender,studies)
{
	return new model.user(userId,password,age,hierarchyLevel,activity,gender,studies);
};
