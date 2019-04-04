lmsApp.controller("authorController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_AUTHORS).then(
			function(data) {
				$scope.myauthors = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.myauthors.length
						/ $scope.pagination.perPage);
			})
			
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BOOKS).then(
			function(data) {
				$scope.mybooks = data;
			})

	$scope.deleteAuthor = function(authorId) {
		var author = {
			"authorId" : authorId
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_AUTHOR,
				author).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_AUTHORS).then(
							function(data) {
								$scope.myauthors = data;
							})
					$window.location = "#/viewauthors"
				})
	}

		
	$scope.addauthor = function() {
		var author = {
			"authorName" : $scope.authorName,
			"books" :$scope.authorBooks
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_AUTHOR,
				author).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_AUTHORS).then(
							function(data) {
								$scope.myauthors = data;
							})
					$window.location = "#/viewauthors"
				})
	}
	
	$scope.editAuthorModal = function(author) {
		$scope.author = author;
	}
	
	$scope.updateAuthor = function(author) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_AUTHOR,
				author).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_AUTHORS).then(
							function(data) {
								$scope.myauthors = data;
							})
					$window.location = "#/viewauthors"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewauthors"
	}


	$scope.searchAuthor = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_AUTHORS
						+ $scope.searchString).then(
				function(data) {
					$scope.myauthors = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.myauthors.length
									/ $scope.pagination.perPage);
				})
	}

})