package com.cars.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cars.models.Reservation;
import com.cars.services.ReservationService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reservations")
public class ReservationController {
	
	@Autowired 
	private ReservationService reservationService;
	
	
    // Read operations
    @GetMapping 
    public List<Reservation> fetchReservationList()
    {
        return reservationService.fetchReservationList();
    }
	
    @GetMapping("/{id}")
    public Reservation fetchReservationById(@PathVariable int id) {
    	return reservationService.fetchReservationById(id);
    }
    
    // Save operation
    @PostMapping 
    public Reservation saveReservation(
        @Valid @RequestBody Reservation reservation)
    {
        return reservationService.saveReservation(reservation);
    }
 

 
    // Update operation
    @PutMapping("/{id}") 
    public Reservation
    updateReservation(@RequestBody Reservation reservation,
                     @PathVariable("id") int reservationId)
    {
        return reservationService.updateReservation(
            reservation, reservationId);
    }
 
    // Delete operation
    @DeleteMapping("/{id}") 
    public String deleteReservationById(@PathVariable("id")
                                       int reservationId)
    {
    	reservationService.deleteReservationById(reservationId);
        return "Deleted Successfully";
    }

}
