package com.cars.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cars.models.Customer;
import com.cars.models.Reservation;
import com.cars.repository.CustomerRepository;

@Service
@Primary
@Transactional
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerRepository repository;
	
	@Override
	public List<Customer> findAllCustomers(int page, int limit) {
		
		return repository.findAll(PageRequest.of(page, limit)).toList();
	}

	@Override
	public List<Reservation> findReservationByCustomerId(int id) {
		
		return repository.findReservationByCustomerId(id);
	}

	@Override
	public Customer findById(int id) {
		Optional<Customer> customer = repository.findById(id);
		return customer.isPresent() ? customer.get() : null;
	}

//	Exactly the same as save()
//	@Override
//	public Customer update(Customer customer) {
//		// Resolve type casting issue
//		return (Customer) repository.save(customer);
//	}

		@Override
	public Customer save(Customer customer) {
		// Resolve type casting issue
		return (Customer) repository.save(customer);
	}

	@Override
	public void deleteById(int id) {
		// Resolve type casting issue
		repository.deleteById(id);;
	}

}
