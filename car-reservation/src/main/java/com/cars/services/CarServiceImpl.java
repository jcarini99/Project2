package com.cars.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional // Adds @Transactional to all methods of this class
public class CarServiceImpl implements CarService {

}
