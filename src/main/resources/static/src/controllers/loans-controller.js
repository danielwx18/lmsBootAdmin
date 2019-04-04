lmsApp.controller("loansController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_LOANS).then(
			function(data) {
				$scope.myloans = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.myloans.length
						/ $scope.pagination.perPage);
			})
				
	$scope.editLoansModal = function(loans) {
		$scope.loans = loans;
	}
	
	
	$scope.updateBookLoans = function(loans) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.OVERRIDE_DUEDATE,
				loans).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_LOANS).then(
							function(data) {
								$scope.myloans = data;
							})
					$window.location = "#/viewloans"
				})
	}

	$scope.cancel = function() {
		
		$window.location = "#/viewloans"
	}


	$scope.searchLoansByBorrower = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_LOANS
						+ $scope.searchString.toLowerCase()).then(
				function(data) {
					$scope.myloans = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.myloans.length
									/ $scope.pagination.perPage);
				})
	}

})