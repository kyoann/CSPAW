exports.formatDate = function(aDate) {
	var result = aDate.getHours() + ':' + aDate.getMinutes() + ' le ' + aDate.getDate() + '/' + (aDate.getMonth() + 1) + '/' + aDate.getFullYear();
	return result;
};
exports.isModerator = function(user) {
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='moderator') {
		return true;
		}
	}
	return false;
}
exports.isUser = function(user) {
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='user') {
		return true;
		}
	}
	return false;
}
exports.isSpecialist = function(user) {
	for(var i = 0;i<user.profil.length;i++) {
		if(user.profil[i]==='specialist') {
		return true;
		}
	}
	return false;
}
