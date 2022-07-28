package com.cars.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cars.models.Customer;
import com.cars.models.Reservation;
import com.cars.services.CustomerService;

@RestController
@RequestMapping("/customers")
public class CustomerController {

	@Autowired 
	private CustomerService service;
	
	@GetMapping
	public List<Customer> findaAllCustomers(@RequestParam(defaultValue = "1") int page, 
			@RequestParam(defaultValue = "3") int limit) {
		return service.findAllCustomers(--page, limit);
	}
	
	@GetMapping("/{id}/reservations")
	public List<Reservation> findReservationByCustomerId(@PathVariable int id) {
		return service.findReservationByCustomerId(id);
	}
	
	@GetMapping("/{id}")
	public Customer findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Customer> create(@Valid @RequestBody Customer customer) {
		return new ResponseEntity<>(service.save(customer), HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public Customer update(@Valid @RequestBody Customer customer, @PathVariable int id) {
		customer.setId(id);
		return service.save(customer);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		service.deleteById(id);
	}
}
