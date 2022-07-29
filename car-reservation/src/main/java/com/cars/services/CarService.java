package com.cars.services;

import java.util.List;

import com.cars.models.Car;

public interface CarService {

	// Read operation
	List<Car> fetchCarList();
	
	//Read by id
	Car fetchCarById(int carId);

	// Save operation
	Car saveCar(Car car);

	// Update operation
//	Car updateCar(Car car, int carId); exactly the same as saveCar()

	// Delete operation
	void deleteCarById(int carId);

}
