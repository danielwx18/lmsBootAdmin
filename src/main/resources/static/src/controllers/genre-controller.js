lmsApp.controller("genreController", function($scope, $http, $window,
		lmsFactory, lmsConstants, Pagination) {
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_GENRES).then(
			function(data) {
				$scope.mygenres = data;
				$scope.pagination = Pagination.getNew(5);
				$scope.pagination.numPages = Math.ceil($scope.mygenres.length
						/ $scope.pagination.perPage);
			})
			
	lmsFactory.getAll(
			lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_BOOKS).then(
			function(data) {
				$scope.mybooks = data;
			})

	$scope.deleteGenre = function(genre_id) {
		var genre = {
			"genre_id" : genre_id
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.DELETE_GENRE,
				genre).then(
				function(data) {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_GENRES).then(
							function(data) {
								$scope.mygenres = data;
							})
					$window.location = "#/viewgenres"
				})
	}

		
	$scope.addgenre = function() {
		var genre = {
			"genre_name" : $scope.genre_name,
			"books" :$scope.genreBooks
		};
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.ADD_GENRE,
				genre).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_GENRES).then(
							function(data) {
								$scope.mygenres = data;
							})
					$window.location = "#/viewgenres"
				})
	}
	
	$scope.editGenreModal = function(genre) {
		$scope.genre = genre;
	}
	
	$scope.updateGenre = function(genre) {
		lmsFactory.saveObject(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.UPDATE_GENRE,
				genre).then(
				function() {
					lmsFactory.getAll(
							lmsConstants.ADMIN_SERVER_URL
									+ lmsConstants.GET_ALL_GENRES).then(
							function(data) {
								$scope.mygenres = data;
							})
					$window.location = "#/viewgenres"
				})
	}

	$scope.cancel = function() {
		$window.location = "#/viewgenres"
	}


	$scope.searchGenre = function() {
		lmsFactory.getAll(
				lmsConstants.ADMIN_SERVER_URL + lmsConstants.GET_ALL_GENRES
						+ $scope.searchString).then(
				function(data) {
					$scope.mygenres = data;
					$scope.pagination = Pagination.getNew(5);
					$scope.pagination.numPages = Math
							.ceil($scope.mygenres.length
									/ $scope.pagination.perPage);
				})
	}

})