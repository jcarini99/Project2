package com.cars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cars.models.Car;
import com.cars.models.Reservation;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
	//Select all cars whose reservations are null or whose start and end times do not fall between 
	//desired reservation times
//	@Query("select c from Car c where c.id not in (select r.car.id from c.reservation r where (r.start and r.end between ?1 and ?2)) order by c.id")
	@Query(value = "SELECT *"
			+ " FROM cars c"
			+ " WHERE c.car_id NOT IN ("
			+ " SELECT r.car_id "
			+ " FROM reservations r"
			+ " WHERE (r.date_start AND r.date_end"
			+ "	BETWEEN"
			+ "	:date_start AND :date_end)"
			+ " OR"
			+ " (:date_start AND :date_end"
			+ " BETWEEN"
			+ " r.date_start AND r.date_end))"
			+ " ORDER BY c.car_id", nativeQuery = true)
	public List<Car> findCarsWithoutReservation(@Param("date_start") String dateStart, @Param("date_end") String dateEnd);
}
