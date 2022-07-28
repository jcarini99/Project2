package com.cars.services;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cars.models.Reservation;
import com.cars.repository.ReservationRepository;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	private ReservationRepository reservationRepository;

	@Override
	public Reservation saveReservation(Reservation reservation) {

		return reservationRepository.save(reservation);
	}

	@Override
	public List<Reservation> fetchReservationList() {

		return (List<Reservation>) reservationRepository.findAll();
	}

	@Override
	public Reservation updateReservation(Reservation reservation, long reservationId) {
		
        Reservation resDB
        = reservationRepository.findById(reservationId).get();
        
        if (reservation == resDB) {
        	
        	resDB.setCar(reservation.getCar());
        	resDB.setCustomer(reservation.getCustomer());
        	resDB.setStart(reservation.getStart());
        	resDB.setEnd(reservation.getEnd());
        	
        	
        }



    return reservationRepository.save(resDB);
	}

	@Override
	public void deleteReservationById(long reservationId) {
		
		reservationRepository.deleteById(reservationId);
		
	}

}
