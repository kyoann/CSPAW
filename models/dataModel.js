exports.story = function (id,title,facts,feelings,problem,userId,date) {
	this.id = id,
	this.version = 0,
	this.title = title,
	this.facts = facts,
	this.feelings = feelings,
	this.problem = problem,
	this.comments = [], 
	this.specialistsOpinions = [], 
	this.state = 'new',
	this.userId = userId,
	this.creationDate = date,
	this.commentsToValidate = 0,
	this.specialistsOpinionsToValidate = 0 
}

exports.comment = function(id,author,creationDate,text) {
	this.id = id;
	this.author = author;
	this.creationDate = creationDate;
	this.text = text;
	this.comments = [];
	this.level = 0;
	this.state = 'toBeValidated';
}

exports.specialistOpinion = function(id,author,creationDate,text) {
	this.id = id;
	this.author = author;
	this.creationDate = creationDate;
	this.text = text;
	this.state = 'toBeValidated';
}

exports.user = function(id,password,age,hierarchyLevel,activity,gender,studies) {
	this.id = id;
	this.password = password;
	this.age = age;
	this.hierarchyLevel = hierarchyLevel;
	this.activity = activity;
	this.gender = gender;
	this.studies = studies;
}
