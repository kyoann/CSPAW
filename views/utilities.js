exports.formatDate = function(aDate) {
	var result = aDate.getHours() + ':' + aDate.getMinutes() + ' le ' + aDate.getDate() + '/' + (aDate.getMonth() + 1) + '/' + aDate.getFullYear();
	return result;
};
