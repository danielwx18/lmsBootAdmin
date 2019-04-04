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

import com.gcit.lms.dao.BookCopiesDAO;
import com.gcit.lms.dao.BookDAO;
import com.gcit.lms.dao.LibraryBranchDAO;
import com.gcit.lms.model.LibraryBranch;

@RestController
@RequestMapping("/admin")
public class AdminLibraryBranchService {

	@Autowired
	LibraryBranchDAO ldao;
	
	@Autowired
	BookDAO bdao;
	
	@Autowired
	BookCopiesDAO cdao;

	@GetMapping(value="/readAllLibraryBranches",produces = "application/json")
	public List<LibraryBranch> readAllLibraryBranches() throws SQLException {
		List<LibraryBranch> branchs = new ArrayList<>();
		try {
			branchs = ldao.readAllBranches();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return branchs;
	}
	
	@GetMapping(value="/readAllLibraryBranchesByAd",produces = "application/json")
	public List<LibraryBranch> readAllLibraryBranchesByAd(@RequestParam String branchName) throws SQLException {
		List<LibraryBranch> branches = new ArrayList<>();
		try {
			if(branchName!=null&&!branchName.isEmpty()) {
				branches = ldao.readBranchsByName(branchName);
			} else {
				branches = ldao.readAllBranches();
			}
			for(LibraryBranch lb:branches) {
				lb.setBookCopies(cdao.readAllBookCopiesByBranch(lb));
				lb.setBooks(bdao.readAllBooksByBranch(lb.getBranchId()));
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return branches;
	}
	
	@Transactional
	@PostMapping(value="/updateLibraryBranches",consumes = "application/json")
	public void updateLibraryBranches(@RequestBody LibraryBranch branch) throws SQLException {
		try {
			ldao.updateBranch(branch);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/addLibraryBranches",consumes = "application/json")
	public void addLibraryBranches(@RequestBody LibraryBranch branch) throws SQLException {
		try {
			ldao.createBranch(branch);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Transactional
	@PostMapping(value="/deleteLibraryBranches",consumes = "application/json")
	public void deleteLibraryBranches(@RequestBody LibraryBranch branch) throws SQLException {
		try {
			ldao.deleteBranch(branch);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}
}
