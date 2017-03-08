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

		//1.展示任务列表
		//1.1处理任务选中状态(input checkbox)
		//		根据isCompleted
		//1.2处理当前任务的状态
		//		根据isCompleted决定是否添加completed类
		var taskList=[
		{id: 1,name: '抽烟', isCompleted: false},
		{id: 2,name: '喝酒', isCompleted: true},
		{id: 1,name: '烫头', isCompleted: false}
		];

		vm.taskList=taskList;
	}
})(window);
