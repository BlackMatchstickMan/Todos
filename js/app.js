(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		//创建模块
		.module('todoApp',[])
		//创建控制器
		.controller('TodoController',['$scope',TodoController]);


	function TodoController($scope){
		var vm=$scope;
	}
})(window);
