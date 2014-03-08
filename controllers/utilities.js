exports.formatDate = function(aDate) {
	var result = aDate.getHours() + ':' + aDate.getMinutes() + ' le ' + aDate.getDate() + '/' + (aDate.getMonth() + 1) + '/' + aDate.getFullYear();
	return result;
};
exports.isAuthenticated = function(user) {
	if(user == undefined) return false;
	return true;
}
exports.isModerator = function(user) {
	if(user == undefined) return false;
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='moderator') {
		return true;
		}
	}
	return false;
}
exports.isUser = function(user) {
	if(user == undefined) return true;
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='user') {
		return true;
		}
	}
	return false;
}
exports.isSpecialist = function(user) {
	if(user == undefined) return false;
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='specialist') {
		return true;
		}
	}
	return false;
}
exports.canHeRead = function(story,user) {
	if(story.state === 'validated') {
		return true;
	}
	if(user === undefined) {
		return false;
	}
	if(story.username === user.username) {
		return true;
	}
	if(exports.isModerator(user)) {
		return true;
	}
	return false;
}
