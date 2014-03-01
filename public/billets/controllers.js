var BilletsControllersModule = angular.module('BilletsControllersModule',[]);

BilletsControllersModule.controller('BilletsListCtrl', function ($scope,$http) {
	$http.get('/billets/list').success(function(data){
		for(var i = 0;i < data.length ; i++) {
			data[i].modifiable = false;
		}
		$scope.billets = data;
	});

	$scope.switchEditable = function (billet) {
		billet.modifiable = ! billet.modifiable;
	};
	$scope.validate = function(billet) {
		billet.modifiable = false;
		$http.post('billets/update',billet).success(function() {
		});
	}
});

BilletsControllersModule.controller('BilletsCreateCtrl',function($scope,$http,$location){
	$scope.billet = {title:'',text:''};
	$scope.cancel = function() {
	};
	$scope.create = function() {
		$http.post('/billets/create',$scope.billet).success(function(){
			$location.path('#/list');
		});
	};
});
