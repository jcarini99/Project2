package com.cars.models;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityReference;

@Entity
@Table(name = "reservations")
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_id")
	private int id;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "car_id")
	@JsonIdentityReference(alwaysAsId = true)
	private Car car;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "customer_id")
	@JsonIdentityReference(alwaysAsId = true)
	private Customer customer;
	
	@NotBlank
	@Column(name = "date_start")
	private String start;
	
	@NotBlank
	@Column(name = "date_end")
	private String end;

	public Reservation() {
		super();
	}

	public Reservation(Car car, Customer customer, @NotBlank String start, @NotBlank String end) {
		super();
		this.car = car;
		this.customer = customer;
		this.start = start;
		this.end = end;
	}

	public Reservation(int id, Car car, Customer customer, @NotBlank String start, @NotBlank String end) {
		super();
		this.id = id;
		this.car = car;
		this.customer = customer;
		this.start = start;
		this.end = end;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
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
		Reservation other = (Reservation) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Reservation [id=" + id + ", start=" + start + ", end=" + end + "]";
	}
	
	
}
