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
import com.gcit.lms.model.Author;
import com.gcit.lms.model.Book;

@RestController
@RequestMapping("/admin")
public class AdminAuthorService {
	
	@Autowired
	AuthorDAO adao;
	
	@Autowired
	BookDAO bdao;

	@GetMapping(value="/readAllAuthors",produces = "application/json")
	public List<Author> readAllAuthors(@RequestParam String authorName) throws SQLException {
		List<Author> authors = new ArrayList<>();
		try {
			if (authorName != null && !authorName.isEmpty()) {
				authors = adao.readAuthorsByName(authorName);
			} else {
				authors = adao.readAllAuthors();
			}
			for (Author a : authors) {
				a.setBooks(bdao.readBooksByAuthorId(a.getAuthorId()));
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return authors;
	}
	
	@Transactional
	@PostMapping(value = "/saveAuthor", consumes="application/json")
	public void saveAuthor(@RequestBody Author author) throws SQLException {
		try {
			if(author.getAuthorId()!=null && author.getAuthorName()!=null){
				adao.updateAuthor(author);
			}else if(author.getAuthorId()!=null){
				adao.deleteAuthor(author);
			}else{
				adao.createAuthor(author);
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/updateAuthors",consumes = "application/json")
	public void updateAuthors(@RequestBody Author author) throws SQLException {
		try {
			adao.updateAuthor(author);
			Integer authorId = author.getAuthorId();
			if(author.getBooks()!=null) {
				adao.deleteAuthorBooks(authorId);
				for(Book b:author.getBooks()) {
					adao.createBookAuthors(b.getBookId(), authorId);
				}
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/addAuthors",consumes = "application/json")
	public void addAuthors(@RequestBody Author author) throws SQLException {
		try {
			Integer authorId = adao.createAuthorToGetPK(author);
			if(author.getBooks()!=null) {
				for(Book b:author.getBooks()) {
					adao.createBookAuthors(b.getBookId(), authorId);
				}
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/deleteAuthors",consumes = "application/json")
	public void deleteAuthors(@RequestBody Author author) throws SQLException {
		try {
			adao.deleteAuthor(author);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
}
