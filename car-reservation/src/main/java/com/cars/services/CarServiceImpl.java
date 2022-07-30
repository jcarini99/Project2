package com.cars.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cars.models.Car;
import com.cars.models.Reservation;
import com.cars.repository.CarRepository;
import com.cars.repository.ReservationRepository;

@Service
@Transactional // Adds @Transactional to all methods of this class
public class CarServiceImpl implements CarService {
	
	@Autowired
	private CarRepository carRepository;


	@Override
	public List<Car> fetchCarList() {

		return (List<Car>) carRepository.findAll();
	}
	
	@Override
	public Car fetchCarById(int carId) {
		// TODO Auto-generated method stub
		Optional<Car> car = carRepository.findById(carId);
		return car.isPresent() ? car.get() : null;
	}
	
	@Override
	public Car saveCar(Car car) {

		return carRepository.save(car);
	}

/*
	@Override
	public Car updateCar(Car car, int carId) {
		
        Car carDB
        = carRepository.findById(carId).get();
        
        if (car == carDB) {
        	
        	carDB.setMake(car.getMake());
        	carDB.setModel(car.getModel());
        	carDB.setYear(car.getYear());
        	carDB.setTier(car.getTier());
        	
        	
        }

    return carRepository.save(carDB);
	}
*/
//	Exactly the same as saveCar()
//	@Override
//	public Car updateCar(Car car, int carId) {
//		
//        Car carDB
//        = carRepository.findById(carId).get();
//        
//        if (car == carDB) {
//        	
//        	carDB.setMake(car.getMake());
//        	carDB.setModel(car.getModel());
//        	carDB.setYear(car.getYear());
//        	carDB.setTier(car.getTier());
//        	
//        	
//        }
//    return carRepository.save(carDB);
//	}
	
	@Override
	public void deleteCarById(int carId) {
		
		carRepository.deleteById(carId);
		
	}

	

}
