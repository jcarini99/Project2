package com.cars.models;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "cars")
public class Car {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "car_id")
//	@OneToMany(mappedBy = "cars") 
	private int id;
	
	@NotBlank
	@Column // defaults to using the Java variable name
	private String make;
	
	@NotBlank
	@Column
	private String model;

	@NotNull
	@Column
	private int year;
	
	@NotNull
	@Column
	private int tier;
	
	@OneToMany(mappedBy = "car")
	private Set<Reservation> reservation;
	
	
	public Car() {
		super();
	}
		

	public Car(int id, @NotBlank String make, @NotBlank String model, @NotBlank int year, @NotBlank int tier) {
		super();
		this.id = id;
		this.make = make;
		this.model = model;
		this.year = year;
		this.tier = tier;
	}


	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getMake() {
		return make;
	}



	public void setMake(String make) {
		this.make = make;
	}



	public String getModel() {
		return model;
	}



	public void setModel(String model) {
		this.model = model;
	}



	public int getYear() {
		return year;
	}



	public void setYear(int year) {
		this.year = year;
	}



	public int getTier() {
		return tier;
	}



	public void setTier(int tier) {
		this.tier = tier;
	}



	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Car other = (Car) obj;
		return id == other.id;
	}

}
