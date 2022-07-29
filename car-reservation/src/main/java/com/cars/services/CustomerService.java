package com.cars.services;

import java.util.List;


import com.cars.models.Customer;
import com.cars.models.Reservation;


public interface CustomerService {
	
	List<Customer> findAllCustomers(int page, int limit);
	List<Reservation> findReservationByCustomerId(int id);
	Customer findById(int id);
	Customer save(Customer customer);
//	Customer update(Customer customer); Exactly the same as save()
	void deleteById(int id);
}
