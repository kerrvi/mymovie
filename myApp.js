/**
 *
 * Created by Kerrvi on 2017/8/21.
 */
'use strict';
(function (angular) {
	//angular.module('myMovieCat',['ngRoute','myMovieCat_inTheaters','myMovieCat_top','myMovieCat_coming'])
	//	.config(['$routeProvider',function($routeProvider){
	//		$routeProvider.otherwise({ redirectTo: '/myInTheaters' });
	//	}]);
	angular.module('myMovieCat', [
		'ngRoute',
		'my_detail',
		'my_list'
	]).config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
		}])
		.controller('navController', ['$scope', '$location','$route', function ($scope, $location,$route) {
			// 搜索
			$scope.input = '';
			$scope.search = function(){
				$route.updateParams({type:'search',q:$scope.input});
			};

			$scope.$location = $location; // 好像是$scope 自己的才能$watch
			$scope.$watch('$location.$$path', function (now, old) {
				//console.log(now);
				if (now.startsWith('/in_theaters')) {
					$scope.type = 'in_theaters';
				} else if (now.startsWith('/coming_soon')) {
					$scope.type = 'coming_soon';
				} else if (now.startsWith('/top250')) {
					$scope.type = 'top250';
				}
				//console.log($scope.type);
			});
		}]);

})(angular);
