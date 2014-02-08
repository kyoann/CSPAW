exports.story = function (id,title,facts,feelings,problem,userId,date,username) {
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
	this.username = username,
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

exports.user = function(id,username,password,age,hierarchyLevel,activity,gender,studies,stories,profil) {
	this.id = id;
	this.username= username;
	this.password = password;
	this.age = age;
	this.hierarchyLevel = hierarchyLevel;
	this.activity = activity;
	this.gender = gender;
	this.studies = studies;
	this.stories = stories;
	this.profil = profil;
};

exports.storyCommentedEvent = function(username,storyid,comment,commentUsername,creationDate) {
	return {
		username:username,
		storyid:storyid,
		comment:comment,
		commentUsername:commentUsername,
		creationDate:creationDate
	}
};
