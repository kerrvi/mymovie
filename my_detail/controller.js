/**
 * Created by Kerrvi on 2017/8/21.
 */
'use strict';
(function(angular){
	angular.module('my_detail',['ngRoute','servicesHttp'])
		.config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/detail/:id',{
				templateUrl:'my_detail/view.html',
				controller:'detailController'
			});
		}])
		.controller('detailController', ['$scope','$route','$routeParams','HttpService', function ($scope,$route,$routeParams,HttpService) {
			// 暴露数据
			$scope.movie = {};
			var url = 'http://api.douban.com/v2/movie/subject/'+ $routeParams.id;

			//jsonp获取数据
			HttpService.jsonp(url,{},function(data){
				$scope.movie = data;
				console.log(data);
				$scope.$apply();
			});

		}]);
})(angular);
