package com.cars.models;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "customer")
public class Customer {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id")
	private int id;
	
	@NotBlank
	@Column(name = "first_name")
	private String first_name;
	
	@NotBlank
	@Column(name = "last_name")
	private String last_name;
	
	@NotBlank
	@Column(name = "date_of_birth")
	private String dateOfBirth;
	
	@NotBlank
	@Column(name = "email")
	private String email;
	
	@NotBlank
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@OneToOne(mappedBy = "customer")
	private Set<Reservation> reservation;
	
	public Customer() {
		super();
	}

	

	public Customer(int id, @NotBlank String first_name, @NotBlank String last_name, @NotBlank String dateOfBirth,
			@NotBlank String email, @NotBlank String phoneNumber, Set<Reservation> reservation) {
		super();
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.dateOfBirth = dateOfBirth;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.reservation = reservation;
	}



	public Customer(@NotBlank String first_name, @NotBlank String last_name, @NotBlank String dateOfBirth,
			@NotBlank String email, @NotBlank String phoneNumber, Set<Reservation> reservation) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.dateOfBirth = dateOfBirth;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.reservation = reservation;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<Reservation> getReservation() {
		return reservation;
	}

	public void setReservation(Set<Reservation> reservation) {
		this.reservation = reservation;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dateOfBirth, email, first_name, id, last_name, phoneNumber);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Customer other = (Customer) obj;
		return Objects.equals(dateOfBirth, other.dateOfBirth) && Objects.equals(email, other.email)
				&& Objects.equals(first_name, other.first_name) && id == other.id
				&& Objects.equals(last_name, other.last_name) && Objects.equals(phoneNumber, other.phoneNumber);
	}

	
	
	
	
	
	
	
	
}
