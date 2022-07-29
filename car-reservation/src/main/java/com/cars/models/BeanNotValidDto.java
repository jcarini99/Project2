package com.cars.models;

import java.util.Date;

public class BeanNotValidDto {

	private Date timestamp;
	private String message;
	
	public BeanNotValidDto() {
		this.timestamp = new Date();
	}
	
	public BeanNotValidDto(String message) {
		this();
		this.message = message;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
