lmsApp.constant("lmsConstants",{
	ADMIN_SERVER_URL: "http://localhost:8060/lms",
	BORROWER_SERVER_URL: "http://localhost:8070/lms",
	LIBRARIAN_SERVER_URL: "http://localhost:8080/lms",
	
	GET_ALL_AUTHORS: "/admin/readAllAuthors?authorName=",
	DELETE_AUTHOR:"/admin/deleteAuthors",
	ADD_AUTHOR:"/admin/addAuthors",
	UPDATE_AUTHOR:"/admin/updateAuthors",
	
	GET_ALL_GENRES:"/admin/readAllGenres?genreName=",
	ADD_GENRE:"/admin/addGenres",
	UPDATE_GENRE:"/admin/updateGenres",
	DELETE_GENRE:"/admin/deleteGenres",
	
	GET_ALL_PUBLISHERS:"/admin/readAllPublishers?publisherName=",
	ADD_PUBLISHER:"/admin/addPublisher",
	UPDATE_PUBLISHER:"/admin/updatePublisher",
	DELETE_PUBLISHER:"/admin/deletePublisher",
	
	GET_ALL_BORROWERS:"/admin/readAllBorrowersByAd?name=",
	ADD_BORROWER:"/admin/addBorrowers",
	UPDATE_BORROWER:"/admin/updateBorrowers",
	DELETE_BORROWER:"/admin/deleteBorrowers",
	
	GET_ALL_BRANCHES:"/admin/readAllLibraryBranchesByAd?branchName=",
	ADD_BRANCH:"/admin/addLibraryBranches",
	UPDATE_BRANCH:"/admin/updateLibraryBranches",
	DELETE_BRANCH:"/admin/deleteLibraryBranches",
	
	GET_ALL_BOOKS:"/admin/readAllBooks?title=",
	ADD_BOOK:"/admin/addBook",
	UPDATE_BOOK:"/admin/updateBook",
	DELETE_BOOK:"/admin/deleteBooks",
	
	GET_ALL_LOANS:"/admin/readAllLoansWithDueDate?name=",
	OVERRIDE_DUEDATE:"/admin/overrideDueDate"
})