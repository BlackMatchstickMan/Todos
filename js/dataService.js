/**
 * Created by Administrator on 2017/3/10.
 */
//提供数据服务的模块
(function (angular) {
	angular
		.module('todoApp.DataSrv', [])
		.service('DataService', ['$window', function ($window) {
			//1.展示任务列表
			//将数据存储到localStorage中，
			//数据也是从中获取
			//获取数据
			var localStorage = $window.localStorage,
				dataStr = localStorage.getItem('todo'),
				taskList = JSON.parse ( dataStr || '[]' );
			this.taskList = taskList;


			this.getData = function () {
				return this.taskList;
			}


			//2.添加数据
			this.setData = function (name) {
				var id, len = this.taskList.length;
				if (len === 0) {
					id = 1;
				} else {
					id = this.taskList[len - 1].id + 1;
				}
				this.taskList.push({id: id, name: name, isCompleted: false});
				this.save();
			}


			//抽离保存数据的方法
			this.save = function () {
				//方法内部的指向是DataService,
				localStorage.setItem('todo', JSON.stringify(this.taskList));
			}



			//3.删除
			this.remove = function (id) {
				for (var i = 0; i < this.taskList.length; i++) {
					var task = this.taskList[i];
					if (task.id === id) {
						//删除数据，会改变原数组
						this.taskList.splice(i, 1);
					}
				}
				this.save();
			}


			//5.切换任务选中状态
			//因为单选切换状态也是修改了状态

			//点击全选按钮
			this.checkAll= function (allChecked) {
				this.taskList.forEach(function (task) {
					task.isCompleted = allChecked;
				});
				this.save();
			}

			//控制全选按钮的样式
			this.allChecked= function () {
				var checked=true;
				(this.taskList.length===0)&&(checked=false);

				this.taskList.forEach(function (task) {
					if(!task.isCompleted){
						checked=false;
					}
				})
				return checked;
			}

			//6.清除已完成任务
			//问题：删除数组中元素时，可能会存在一些删除不了的问题，我们现在要把任务列表中所有已完成的任务删除掉，
			//也就是把未完成的任务保留起来
			this.clearAll= function () {
				var tmp = [];
				for (var i = 0; i < this.taskList.length; i++) {
					if (!this.taskList[i].isCompleted) {
						tmp.push(this.taskList[i]);
					}
				}
				this.taskList = tmp;
				this.save();
			}


			this.isShow= function () {
				var tmp = false;
				for (var i = 0; i < this.taskList.length; i++) {
					if (this.taskList[i].isCompleted) {
						tmp = true;
						break;
					}
				}
				return tmp;
			}


			//7.显示未完成数

			this.getUncompleted= function () {
				var count = 0;
				this.taskList.forEach(function (task) {
					if (!task.isCompleted) {
						count++;
					}
				})
				return count;
			}
		}])
})(angular);
