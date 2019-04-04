lmsApp.controller("bookController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BOOKS).then(
			function(data) {
				$scope.mybooks = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.mybooks.length
						/ $scope.pagination.perPage);
			})
			
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_AUTHORS).then(
			function(data) {
				$scope.myauthors = data;
			})

	$scope.deleteBook = function(bookId) {
		var book = {
			"bookId" : bookId
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_BOOK,
				book).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BOOKS).then(
							function(data) {
								$scope.mybooks = data;
							})
					$window.location = "#/viewbooks"
				})
	}
	
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_PUBLISHERS).then(
			function(data) {
				$scope.mypublishers = data;
			})

	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_GENRES).then(
			function(data) {
				$scope.mygenres = data;
			})
		
	$scope.addbook = function() {
		var book = {
			"title" : $scope.bookTitle,
			"authors" : $scope.bookAuthors,
			"genre" : $scope.bookGenres,
			"publisher" : $scope.bookPub
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_BOOK,
				book).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BOOKS).then(
							function(data) {
								$scope.mybooks = data;
							})
					$window.location = "#/viewbooks"
				})
	}
	
	$scope.editBookModal = function(book) {
		$scope.book = book;
	}
	
	$scope.changePub = function(book) {
		var pub = $scope.selectedPub;
		book.pubId = pub.publisherId;
	}
	
	$scope.updateBook = function(book) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_BOOK,
				book).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_BOOKS).then(
							function(data) {
								$scope.mybooks = data;
							})
					$window.location = "#/viewbooks"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewbooks"
	}


	$scope.searchBook = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BOOKS
						+ $scope.searchString.toLowerCase()).then(
				function(data) {
					$scope.mybooks = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.mybooks.length
									/ $scope.pagination.perPage);
				})
	}

})