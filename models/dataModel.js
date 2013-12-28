exports.story = function (id,title,facts,feelings,problem,author) {
	this.id = id,
	this.version = 0,
	this.title = title,
	this.facts = facts,
	this.feelings = feelings,
	this.problem = problem,
	this.comments = [], 
	this.state = 'new',
	this.author = author,
	this.creationDate = new Date(),
	this.commentsToValidate = 0
}

exports.comment = function(id,author,creationDate,text) {
	this.id = id;
	this.author = author;
	this.creationDate = creationDate;
	this.text = text;
	this.comments = [];
	this.level = 0;
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
