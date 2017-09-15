/**
 * Created by Kerrvi on 2017/8/21.
 */
'use strict';
(function(angular){
	angular.module('my_list',['ngRoute','servicesHttp'])
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/:type/:page',{
				templateUrl:'my_list/view.html',
				controller:'listController'
			});
		}])
		.controller('listController', ['$scope','$route','$routeParams','HttpService', function ($scope,$route,$routeParams,HttpService) {
			// 分页
			var count = 3; // 每页数据数量
			var page = parseInt($routeParams.page); // 当前页
			var start = (page - 1) * count; //每页开始的数据
			// 暴露数据
			$scope.loading = true;
			$scope.films = {};
			$scope.message = '';
			$scope.totalPage = 0;
			$scope.currentPage = page;
			// 获取数据
			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.type,{start:start,count:count,q:$routeParams.q},function(data){
				$scope.films = data;
				$scope.totalPage = Math.ceil(data.total / count);
				$scope.loading = false;
				$scope.$apply('films');
			});
			//暴露行为
			$scope.select = function(page){
				if(page >= 1 && page <= $scope.totalPage){
					$route.updateParams({page:page});
				}
			};
		}]);
})(angular);
