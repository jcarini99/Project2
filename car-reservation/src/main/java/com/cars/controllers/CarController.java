package com.cars.controllers;
import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cars.models.Car;

@RestController // @RestController = @Controller + @ResponseBody
@CrossOrigin("*") // If you don't like CorsFilter, you're in luck. They do the same thing
@RequestMapping("/cars") // Adds /pets to all methods in this function
public class CarController {
	
	// find all
		@GetMapping
		public List<Car> findAll() {
			// List will get transformed by Jackson into a JSON array
			LinkedList<Car> cars = new LinkedList<>();
			return cars;
		}
		
		// find by id
		// The {id} symbolizes that I can pull this out of the URL path
		@GetMapping("/{id}")
		public Car findById(@PathVariable int id) {
			return new Car();
		}
		
		// create
		@PostMapping
		public Car create(@Valid @RequestBody Car car) {
			return car;
		}
		
		// update
		@PutMapping("/{id}")
		public Car update(@Valid @RequestBody Car car, @PathVariable int id) {
			car.setId(id);
			return car; // repository.save(pet);
		}
		
		// delete by id
		@DeleteMapping("/{id}")
		public void delete(@PathVariable int id) {
			// Deletes the pet from the database
		}
	
	

}
