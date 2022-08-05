package com.cars.services;

import java.util.List;
import java.util.Optional;

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
	public Reservation fetchReservationById(int id) {
		Optional<Reservation> reservation = reservationRepository.findById(id);
		return reservation.isPresent() ? reservation.get() : null;
	}
	
	@Override
	public Reservation fetchReservationByIdAndCustomerId(int id, int customerId) {
		Reservation reservation = reservationRepository.findByIdAndCustomerId(id, customerId);
		if (reservation != null) {
			return reservation;
		} else {
			
			return null;
		}		
	}
		
	@Override
	public Reservation updateReservation(Reservation reservation, int reservationId) {
		
        Reservation resDB = reservationRepository.findById(reservationId).get();
                
        
        if (reservationId == resDB.getId()) {
        	
        	resDB.setCar(reservation.getCar());
        	resDB.setStart(reservation.getStart());
        	resDB.setEnd(reservation.getEnd());
        	
        }
        
        return reservationRepository.save(resDB);
	}

	@Override
	public void deleteReservationById(int reservationId) {
		
		reservationRepository.deleteById(reservationId);
		
	}


	@Override
	public List<Reservation> validateAvailReservation(String dateStart, String dateEnd, int carId) {
	
		return (List<Reservation>)reservationRepository.validateCarReservation(dateStart, dateEnd, carId);
	}

	@Override
	public List<Reservation> validateAvailUpdate(String dateStart, String dateEnd, int carId, int reservationId) {
	
		return (List<Reservation>)reservationRepository.validateCarUpdate(dateStart, dateEnd, carId, reservationId);
	}

	
	

}
