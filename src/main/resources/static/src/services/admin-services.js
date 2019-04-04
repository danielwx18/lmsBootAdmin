lmsApp.factory("lmsFactory", function($http) {
	return {
		getAll : function(url) {
			var listObjs = {};
			return $http.get(url).success(function(data) {
				listObjs = data;
			}).then(function() {
				return listObjs;
			})
		},
		saveObject : function(url, obj) {
			var listObjs = {};
			return $http.post(url, obj).success(function(data) {
				listObjs = data;
			}).then(function() {
				return listObjs;
			})
		}
	}
})