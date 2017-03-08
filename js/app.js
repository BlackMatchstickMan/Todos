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
		{id: 3,name: '烫头', isCompleted: false},
		{id: 4,name: '说相声', isCompleted: true}
		];

		vm.taskList=taskList;


		//2.添加任务
		//2.1在输入框输入，敲回车
		//2.2清空
		//2.3判断是否为空，为空不处理
		vm.newTask='';
		vm.add= function () {
			//只需要往数组中添加数据就可以了，页面结构会自动改变
			//vm.taskList.push({id:5,name:'打豆豆',isCompleted:false})
			if(vm.newTask.trim()===''){
				return;
			}
			//根据数组中最后一项id+1，获取当前id
			var id,len=vm.taskList.length;
			if(len===0){
				id=1;
			}else{
				id=vm.taskList[len-1].id+1;
			}
			//添加任务
			vm.taskList.push({id:id,name:vm.newTask,isCompleted:false});
			vm.newTask='';
		}
	}
})(window);
