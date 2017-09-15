/**
 * Created by Kerrvi on 2017/8/23.
 */
'use strict';
(function(angular){
	// 创建一模块
	angular.module('servicesHttp',[])
		// 创建Http服务对象
		.service('HttpService',['$window','$document',function($window,$document){
			 this.jsonp = function(url,data,callback){
				//yi一，挂载回调函数
				// 取一避免重复的名字，挂载至window
				var cbName = 'my_jsonp_cb' + Math.random().toString().replace('.','');
				 // 回调函数执行完后删除添加的script标签
				 $window[cbName] = function(data){
					 callback(data);
					 $document[0].head.removeChild(script);
				 };

				//er二、把data={count:1,start:0}转化为查询查询字符串 ?conut=1&start=0
				var queryString = url.indexOf('?') == -1 ? '?' : '&';
				for(var key in data){
					queryString += key + '=' + data[key] + '&';
				}

				//三、把callback=cbName拼接到querystring
				queryString += 'callback=' + cbName;

				//创建script：<script src="http://api.douban.com/v2/movie/in_theaters?count=1&amp;start=0&amp;callback=my_json_cb_04298311693803476"></script>
				var script = $document[0].createElement('script');
				script.src = url + queryString;

				// 添加到html
				$document[0].head.appendChild(script);
			}
			// 暴露jsonp
			//$window.$jsonp = jsonp;
		}]);
})(angular);
