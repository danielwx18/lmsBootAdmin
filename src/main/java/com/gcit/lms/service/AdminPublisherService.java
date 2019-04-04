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
import com.gcit.lms.dao.PublisherDAO;
import com.gcit.lms.model.Publisher;

@RestController
@RequestMapping("/admin")
public class AdminPublisherService {

	@Autowired
	PublisherDAO pdao;
	
	@Autowired
	BookDAO bdao;

	@Transactional
	@PostMapping(value="/addPublisher",consumes = "application/json")
	public void addPublisher(@RequestBody Publisher publisher) throws SQLException {
		try {
			pdao.createPublisher(publisher);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}

	@Transactional
	@PostMapping(value="/updatePublisher",consumes = "application/json")
	public void updatePublisher(@RequestBody Publisher publisher) throws SQLException {
		try {
			pdao.updatePublisher(publisher);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}

	@Transactional
	@PostMapping(value="/readAllPublishersByObj",produces = "application/json",consumes = "application/json")
	public List<Publisher> readAllPublishersObj(@RequestBody Publisher publisher) throws SQLException {
		List<Publisher> publishers = new ArrayList<>();
		try {
			publishers = pdao.readAllPublishers();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return publishers;
	}
	
	@GetMapping(value="/readAllPublishers",produces = "application/json")
	public List<Publisher> readAllPublishers(@RequestParam String publisherName) throws SQLException {
		List<Publisher> publishers = new ArrayList<>();
		try {
			if(publisherName!=null&&!publisherName.isEmpty()) {
				publishers = pdao.readPublishersByName(publisherName);
			} else {
				publishers = pdao.readAllPublishers();
			}
			for(Publisher p:publishers) {
				p.setBooks(bdao.readBooksByPubId(p.getPublisherId()));
			}
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return publishers;
	}

	@GetMapping(value="/readPublisherByPK",produces = "application/json")
	public Publisher readPublisherByPK(@RequestParam Integer publisherId) throws SQLException {
		Publisher publisher = new Publisher();
		try {
			publisher = pdao.getPublisherByPK(publisherId);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
		return publisher;
	}

	@Transactional
	@PostMapping(value="/deletePublisher",consumes = "application/json")
	public void deletePublisher(@RequestBody Publisher publisher) throws SQLException {
		try {
			pdao.deletePublisher(publisher);
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException e) {
			System.out.println("Something went wrong, sorry!");
			e.printStackTrace();
		}
	}
}
