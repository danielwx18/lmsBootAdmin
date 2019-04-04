lmsApp.controller("publisherController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_PUBLISHERS).then(
			function(data) {
				$scope.mypublishers = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.mypublishers.length
						/ $scope.pagination.perPage);
			})

	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BOOKS).then(
			function(data) {
				$scope.mybooks = data;
			})
			
	$scope.deletePublisher = function(publisherId) {
		var publisher = {
			"publisherId" : publisherId
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_PUBLISHER,
				publisher).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_PUBLISHERS).then(
							function(data) {
								$scope.mypublishers = data;
							})
					$window.location = "#/viewpublishers"
				})
	}

		
	$scope.addpublisher = function() {
		var publisher = {
			"publisherName" : $scope.publisherName,
			"publisherAddress" : $scope.publisherAddress,
			"publisherPhone" : $scope.publisherPhone,
			"books" : $scope.pubBooks
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_PUBLISHER,
				publisher).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_PUBLISHERS).then(
							function(data) {
								$scope.mypublishers = data;
							})
					$window.location = "#/viewpublishers"
				})
	}
	
	$scope.editPublisherModal = function(publisher) {
		$scope.publisher = publisher;
	}
	
	$scope.updatePublisher = function(publisher) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_PUBLISHER,
				publisher).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_PUBLISHERS).then(
							function(data) {
								$scope.mypublishers = data;
							})
					$window.location = "#/viewpublishers"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewpublishers"
	}


	$scope.searchPublisher = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_PUBLISHERS
						+ $scope.searchString).then(
				function(data) {
					$scope.mypublishers = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.mypublishers.length
									/ $scope.pagination.perPage);
				})
	}

})