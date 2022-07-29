package com.cars.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cars.models.Reservation;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {

}
