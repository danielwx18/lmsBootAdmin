lmsApp.controller("borrowerController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BORROWERS).then(
			function(data) {
				$scope.myborrowers = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.myborrowers.length
						/ $scope.pagination.perPage);
			})

	$scope.deleteBorrower = function(cardNo) {
		var borrower = {
			"cardNo" : cardNo
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_BORROWER,
				borrower).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BORROWERS).then(
							function(data) {
								$scope.myborrowers = data;
							})
					$window.location = "#/viewborrowers"
				})
	}

		
	$scope.addborrower = function() {
		var borrower = {
			"name" : $scope.borrowerName,
			"address" : $scope.borrowerAddress,
			"phone" : $scope.borrowerPhone
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_BORROWER,
				borrower).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BORROWERS).then(
							function(data) {
								$scope.myborrowers = data;
							})
					$window.location = "#/viewborrowers"
				})
	}
	
	$scope.editBorrowerModal = function(borrower) {
		$scope.borrower = borrower;
	}
	
	$scope.updateBorrower = function(borrower) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_BORROWER,
				borrower).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BORROWERS).then(
							function(data) {
								$scope.myborrowers = data;
							})
					$window.location = "#/viewborrowers"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewborrowers"
	}


	$scope.searchBorrower = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BORROWERS
						+ $scope.searchString).then(
				function(data) {
					$scope.myborrowers = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.myborrowers.length
									/ $scope.pagination.perPage);
				})
	}

})