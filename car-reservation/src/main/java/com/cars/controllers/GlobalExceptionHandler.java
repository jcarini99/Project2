package com.cars.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cars.models.BeanNotValidDto;


@RestControllerAdvice // @RestControllerAdvice = @ControllerAvice + @ResponseBody
public class GlobalExceptionHandler {


	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class) // 
	public BeanNotValidDto invalidBean(Exception e) {
		return new BeanNotValidDto(e.getMessage());
	}
	
}
