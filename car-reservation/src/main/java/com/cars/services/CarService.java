package com.cars.services;

import java.util.List;

import com.cars.models.Car;

public interface CarService {
	
	// Save operation
		Car saveCar(Car car);
		
		// Read operation
		List<Car> fetchCarList();
		
		// Update operation
		Car updateCar(Car car, long carId);
		
		// Delete operation
		void deleteCarById(long carId);

}
