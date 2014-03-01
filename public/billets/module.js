var BilletsModule = angular.module('BilletsModule', ['ngRoute','BilletsControllersModule']);

BilletsModule.config(
	[
	'$routeProvider',function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl:'/billets/list.htm',
		controller:'BilletsListCtrl'
	}).when('/create',{
		templateUrl:'/billets/create.htm',
		controller:'BilletsCreateCtrl'
	}).otherwise({
		redirectTo:'/list'
	});;
}

]

);


