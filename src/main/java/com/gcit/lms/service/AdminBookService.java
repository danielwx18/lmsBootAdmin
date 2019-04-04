package com.gcit.lms.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcit.lms.dao.AuthorDAO;
import com.gcit.lms.dao.BookDAO;
import com.gcit.lms.dao.GenreDAO;
import com.gcit.lms.dao.PublisherDAO;
import com.gcit.lms.model.Author;
import com.gcit.lms.model.Book;
import com.gcit.lms.model.Genre;

@RestController
@RequestMapping("/admin")
public class AdminBookService {

	@Autowired
	AuthorDAO adao;

	@Autowired
	BookDAO bdao;

	@Autowired
	PublisherDAO pdao;

	@Autowired
	GenreDAO gdao;

	@Transactional
	@PostMapping(value="/addBook",consumes = "application/json")
	public void addBook(@RequestBody Book book) throws SQLException {
		try {
			Integer bookId = bdao.createBookToGetPK(book);
			if (book.getAuthors() != null) {
				for (Author a : book.getAuthors()) {
					adao.createBookAuthors(bookId, a.getAuthorId());
				}
			}
			if (book.getGenre() != null) {
				for (Genre g : book.getGenre()) {
					gdao.createBookgenres(bookId, g.getGenre_id());
				}
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}
		
	@GetMapping(value="/readAllBooksTest",produces = "application/json")
	public List<Book> readAllBooks() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books=bdao.readAllBooks();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}

	@Transactional
	@PostMapping(value="/updateBook",consumes = "application/json")
	public void updateBook(@RequestBody Book book) throws SQLException {
		try {
			bdao.updateBook(book);
			Integer bookId = book.getBookId();
			if (book.getAuthors() != null) {
				adao.deleteBookAuthors(bookId);
				for (Author a : book.getAuthors()) {
					adao.createBookAuthors(bookId, a.getAuthorId());
				}
			}
			if (book.getGenre() != null) {
				gdao.deleteBookGenres(bookId);
				for (Genre g : book.getGenre()) {
					gdao.createBookgenres(bookId, g.getGenre_id());
				}
			}			
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}

	@GetMapping(value="/readAllBooks",produces = "application/json")
	public List<Book> readAllBooksByName(@RequestParam String title) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			if(title!=null&&!title.isEmpty()) {
				books = bdao.readBooksByName(title);
			} else {
				books=bdao.readAllBooks();
			}
			for(Book b: books) {
				b.setAuthors(adao.readAllAuthorsByBook(b.getBookId()));
				b.setGenre(gdao.readAllgenresByBook(b.getBookId()));
				b.setPublisher(pdao.getPublisherByPK(b.getPubId()));
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksWithCopies",produces = "application/json")
	public List<Book> readAllBooksWithCopies() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			bdao.readBooksWithCopies();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksWithPublisher",produces = "application/json")
	public List<Book> readAllBooksWithPublisher() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			bdao.readBooksWithPublisher();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksWithGenres",produces = "application/json")
	public List<Book> readAllBooksWithGenres() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			bdao.readBooksWithGenres();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksWithAuthors",produces = "application/json")
	public List<Book> readAllBooksWithAuthors() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			bdao.readBooksWithAuthors();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksByAuthor",produces = "application/json")
	public List<Book> readAllBooksByAuthor(@RequestParam Integer authorId) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books =bdao.readBooksByAuthorId(authorId);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}
	
	@GetMapping(value="/readAllBooksByGenre",produces = "application/json")
	public List<Book> readAllBooksByGenre(@RequestParam Integer genre_id) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books =bdao.readBooksByGenreId(genre_id);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return books;
	}

	@Transactional
	@PostMapping(value="/deleteBooks",consumes = "application/json")
	public void deleteBooks(@RequestBody Book book) throws SQLException {
		try {
			bdao.deleteBook(book);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}
}
