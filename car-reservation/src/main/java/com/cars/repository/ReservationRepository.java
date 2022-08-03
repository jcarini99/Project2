package com.cars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cars.models.Car;
import com.cars.models.Reservation;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
	
	//Validate reservation to see if the selected car was not picked by someone else by checking if the selected car reservation doesn't 
	// fall between desired reservation times
	@Query(value = "SELECT * FROM reservations r"
			+ " WHERE (r.date_start AND r.date_end BETWEEN :date_start AND :date_end)"
			+ " AND r.car_id = :car_id", nativeQuery = true)
	public List<Reservation> validateCarReservation(@Param("date_start") String dateStart, @Param("date_end") String dateEnd, @Param("car_id") int carId);

	//Validate reservation to see if the selected car was not picked by someone else by checking if the selected car reservation doesn't 
		// fall between desired reservation times
		@Query(value = "SELECT * FROM reservations r"
				+ " WHERE (r.date_start AND r.date_end BETWEEN :date_start AND :date_end)"
				+ " AND r.car_id = :car_id", nativeQuery = true)
		public List<Reservation> validateCarReservation(@Param("date_start") String dateStart, @Param("date_end") String dateEnd, @Param("car_id") int carId);

		
//	@Query("SELECT * FROM reservations r WHERE r.reservation_id = ?1 AND r.customer_id = ?2")
//	public Reservation findReservationByIdAndCustomerId(int id, int customer.getId());
	
	public Reservation findByIdAndCustomerId(int id, int customerId);
}
