package com.cars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cars.models.Customer;
import com.cars.models.Reservation;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	@Query("select r from Reservation r where r.customer.id = ?1")
	public List<Reservation> findReservationByCustomerId(int id);

}
