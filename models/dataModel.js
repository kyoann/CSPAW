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

exports.specialistOpinion = function(id,author,creationDate,text,profession,firstName,lastName) {
	this.id = id;
	this.author = author;
	this.creationDate = creationDate;
	this.text = text;
	this.state = 'toBeValidated';
	this.profession = profession;
	this.firstName = firstName;
	this.lastName = lastName;
}

exports.user = function(id,username,password,age,hierarchyLevel,activity,gender,studies,stories,profil,firstName,lastName,profession) {
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
	this.firstName = firstName;
	this.lastName = lastName;
	this.profession = profession;
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

exports.commentCommentedEvent = function(storyTitle,storyId,commentedCommentUsername,commentingCommentUsername,commentedComment,commentingComment,creationDate) {
	return {
		username:commentedCommentUsername,
		storyTitle:storyTitle,
		storyId:storyId,
		commentedCommentUsername:commentedCommentUsername,
		commentingCommentUsername:commentingCommentUsername,
		commentedComment:commentedComment,
		commentingComment:commentingComment,
		creationDate:creationDate
	}
};
