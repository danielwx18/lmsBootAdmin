lmsApp.controller("branchController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BRANCHES).then(
			function(data) {
				$scope.mybranchs = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.mybranchs.length
						/ $scope.pagination.perPage);
			})

	$scope.deleteBranch = function(branchId) {
		var branch = {
			"branchId" : branchId
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_BRANCH,
				branch).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BRANCHES).then(
							function(data) {
								$scope.mybranchs = data;
							})
					$window.location = "#/viewbranches"
				})
	}

		
	$scope.addbranch = function() {
		var branch = {
			"branchName" : $scope.branchName,
			"branchAddress" : $scope.branchAddress
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_BRANCH,
				branch).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BRANCHES).then(
							function(data) {
								$scope.mybranchs = data;
							})
					$window.location = "#/viewbranches"
				})
	}
	
	$scope.editBranchModal = function(branch) {
		$scope.branch = branch;
	}
	
	$scope.updateBranch = function(branch) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_BRANCH,
				branch).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BRANCHES).then(
							function(data) {
								$scope.mybranchs = data;
							})
					$window.location = "#/viewbranches"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewbranches"
	}


	$scope.searchBranch = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BRANCHES
						+ $scope.searchString).then(
				function(data) {
					$scope.mybranchs = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.mybranchs.length
									/ $scope.pagination.perPage);
				})
	}

})