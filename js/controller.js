/**
 * Created by Administrator on 2017/3/10.
 */
(function (angular) {
	angular
		.module('todoApp.controller', [])
		.controller('TodoController', ['$scope', '$location', 'DataService', TodoController]);

	function TodoController($scope, $location, DataService) {
		var vm = $scope;

		//1.展示任务列表
		//1.1处理任务选中状态(input checkbox)
		//		根据isCompleted
		//1.2处理当前任务的状态
		//		根据isCompleted决定是否添加completed类
		vm.taskList = DataService.getData();


		//2.添加任务
		//2.1在输入框输入，敲回车
		//2.2清空
		//2.3判断是否为空，为空不处理
		vm.newTask = '';
		vm.add = function () {
			//只需要往数组中添加数据就可以了，页面结构会自动改变
			//vm.taskList.push({id:5,name:'打豆豆',isCompleted:false})
			if (vm.newTask.trim() === '') {
				return;
			}
			DataService.setData(vm.newTask);
			vm.newTask = '';
			vm.allChecked = false;
		};

		//3.删除一条任务
		//3.1根据当前项的id
		vm.remove = function (id) {
			DataService.remove(id);
		}

		//4.修改任务
		//4.1给每一项绑定双击事件ng-dblclick
		//4.2双击后给当前元素添加一个editing的类
		//4.3展示出文本框之后，要将当前项的名称展示出来
		vm.editId = 0;
		vm.edit = function (id) {
			//双击元素，就让editId变为当前id
			vm.editId = id;
		}
		vm.update = function () {
			//editId和task.id不同，就没有editing类了
			vm.editId = 0;
			DataService.save();
		}

		//5.切换选中状态
		//其他方式：监视allChecked的值
		//使用方法代替属性
		//vm.allChecked = false;
		vm.allChecked = DataService.allChecked();
		vm.checkAll = function () {
			DataService.checkAll(vm.allChecked);
		}

		//切换单个任务的状态
		vm.toggleItem = function () {
			vm.allChecked = DataService.allChecked();
			//选中状态切换后，需要进行保存
		}


		//6.清除已完成任务
		//6.1clear completed按钮的展示和隐藏由：列表中是否有已完成的任务来确定
		//有： 显示
		//无： 隐藏
		//6.2单击清除按钮后，会把任务列表中所有已完成任务都删除
		vm.clearAll = function () {
			//因为这个方法修改了this.taskList的指向，需要重新获取
			DataService.clearAll();
			vm.taskList = DataService.getData();
			DataService.save();
		}
		//这个值用来控制清除按钮的展示和隐藏状态
		//$watch太过于损耗性能
		/*vm.isShow = false;
		 vm.$watch('taskList', function (newval, oldval) {
		 var tmp = false;
		 for (var i = 0; i < vm.taskList.length; i++) {
		 if (vm.taskList[i].isCompleted) {
		 tmp = true;
		 //vm.isShow=true;
		 break;
		 }
		 //vm.isShow=false;
		 }
		 vm.isShow = tmp;
		 }, true);*/
		vm.isShow = function () {
			return DataService.isShow();
		}


		//7.显示未完成任务
		//下列函数返回未完成任务数
		vm.getUnCompleted = function () {
			return DataService.getUncompleted();
		}

		//8.显示不同状态的任务
		//8.1任务有三种状态，所有，未完成，已完成
		//点击不同的状态图标，显示对应的状态，
		//8.2 任务图标高亮，添加selected类
		//
		//通过 过滤器 来实现这个功能
		vm.selectedStatus = {isCompleted: undefined};

		//跳转功能实现后就不需要这些事件了，因为a跳转会改变hash值
		/*
		 vm.selectAll= function () {
		 vm.selectedStatus.isCompleted=undefined;
		 };
		 vm.selectActive= function () {
		 vm.selectedStatus.isCompleted=false;
		 };
		 vm.selectCompleted= function () {
		 vm.selectedStatus.isCompleted=true;
		 }
		 */

		//9.根据url变化展示相应任务
		//9.1根据url的hash值来展示不同的任务
		//9.2先获取到url的hash值
		//	location.hash
		//9.3 因为location不是angular的内容，所以需要通过注入的形式
		//9.4 $watch只能监视$scope里的内容
		vm.location = $location;
		vm.$watch('location.url()', function (newval, oldval) {
			console.log(newval);
			/*
			 * /
			 * /active
			 * /completed
			 */
			switch (newval) {
				case '#%2F':
					vm.selectedStatus = {isCompleted: undefined};
					break;
				case '#%2Factive':
					vm.selectedStatus = {isCompleted: false};
					break;
				case '#%2Fcompleted':
					vm.selectedStatus = {isCompleted: true};
					break;
			}
		})


	}
})(angular)
