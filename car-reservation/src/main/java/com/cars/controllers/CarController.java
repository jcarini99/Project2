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
import com.cars.services.CarService;

@RestController // @RestController = @Controller + @ResponseBody
@CrossOrigin("*") // Using cross filter
@RequestMapping("/cars") //
public class CarController {

	private CarService carService;

	// find all
	@GetMapping
	public List<Car> findAll() {
		
		// List will get transformed by Jackson into a JSON array
		return carService.fetchCarList();
		

	}

	// find by id
	// The {id} symbolizes that I can pull this out of the URL path
	@GetMapping("/{id}")
	public Car findById(@PathVariable int id) {
		return carService.fetchCarById(id);
	}

	// create/save
	@PostMapping
	public Car save(@Valid @RequestBody Car car) {
		return carService.saveCar(car);
	}

	// update
	@PutMapping("/{id}")
	public Car update(@Valid @RequestBody Car car, @PathVariable int id) {
		
		return carService.updateCar(car, id); // 
	}

	// delete by id
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		// Deletes car
		carService.deleteCarById(id);
	}

}
