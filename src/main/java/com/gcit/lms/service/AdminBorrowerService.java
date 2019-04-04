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

import com.gcit.lms.dao.BookDAO;
import com.gcit.lms.dao.BookLoansDAO;
import com.gcit.lms.dao.BorrowerDAO;
import com.gcit.lms.model.Borrower;

@RestController
@RequestMapping("/admin")
public class AdminBorrowerService {
	@Autowired
	BorrowerDAO brdao;
	
	@Autowired
	BookDAO bdao;
	
	@Autowired
	BookLoansDAO bldao;

	@GetMapping(value="/readAllBorrowers",produces = "application/json")
	public List<Borrower> readAllBorrowers() throws SQLException {
		List<Borrower> borrowers = new ArrayList<>();
		try {
			borrowers = brdao.readAllBorrowers();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return borrowers;
	}
	
	@GetMapping(value="/readAllBorrowersByAd",produces = "application/json")
	public List<Borrower> readAllBorrowersByAd(@RequestParam String name) throws SQLException {
		List<Borrower> borrowers = new ArrayList<>();
		try {
			if(name!=null&&!name.isEmpty()) {
				borrowers = brdao.readBorrowersByName(name);
			} else {
				borrowers = brdao.readAllBorrowers();
			}
			for(Borrower br:borrowers) {
				br.setBooks(bdao.readAllBooksByBorrower(br.getCardNo()));
				br.setBookLoans(bldao.readLoansByBorrower(br.getCardNo()));
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return borrowers;
	}
	
	@Transactional
	@PostMapping(value="/updateBorrowers",consumes = "application/json")
	public void updateBorrowers(@RequestBody Borrower borrower) throws SQLException {
		try {
			brdao.updateBorrower(borrower);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/addBorrowers",consumes = "application/json")
	public void addBorrowers(@RequestBody Borrower borrower) throws SQLException {
		try {
			brdao.createBorrower(borrower);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/deleteBorrowers",consumes = "application/json")
	public void deleteBorrowers(@RequestBody Borrower borrower) throws SQLException {
		try {
			brdao.deleteBorrower(borrower);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
}
