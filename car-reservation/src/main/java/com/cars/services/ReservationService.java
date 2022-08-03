package com.cars.services;

import java.util.List;

import com.cars.models.Reservation;

public interface ReservationService {

	// Save operation
	Reservation saveReservation(Reservation reservation);
	
	// Read operations
	List<Reservation> fetchReservationList();
	Reservation fetchReservationById(int id);
	Reservation fetchReservationByIdAndCustomerId(int id, int customerId);
	
	// Update operation
	Reservation updateReservation(Reservation reservation, int reservationId);
	
	// Delete operation
	void deleteReservationById(int reservationId);
	
	//Validate reservations
	List<Reservation> validateAvailReservation(String dateStart, String dateEnd, int carId);
}
