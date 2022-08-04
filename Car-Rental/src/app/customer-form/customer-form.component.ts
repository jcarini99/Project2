import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})

export class CustomerFormComponent implements OnInit {

  service: CarApiService;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  dateStart: any;
  dateEnd: any;
  vehicle: any;
  vehicleId: any;
  vehicleMake: any;
  vehicleModel: any;
  vehicleYear: any;
  vehicleTier: any;



  constructor(service: CarApiService, private router: Router) {
    this.service = service;

  }

  ngOnInit(): void {
    if (this.service.reservationTimes.dateStart == null || this.service.reservationTimes.dateStart == null) {
      this.router.navigateByUrl('/home')
    }
    else if ((this.service.reservationTimes.dateStart != null && this.service.reservationTimes.dateStart != null) && this.service.chosenVehicle.id == null) {
      this.router.navigateByUrl('/cars')
    }
    else {
      this.vehicle = this.service.chosenVehicle;
      this.vehicleId = this.service.chosenVehicle.id;
      this.vehicleMake = this.service.chosenVehicle.make;
      this.vehicleModel = this.service.chosenVehicle.model;
      this.vehicleYear = this.service.chosenVehicle.year;
      this.vehicleTier = this.service.chosenVehicle.tier;
      this.dateStart = this.service.reservationTimes.dateStart;
      this.dateEnd = this.service.reservationTimes.dateEnd;
<<<<<<< Updated upstream
=======
      this.alterDate(this.dateStart, this.dateEnd);
    }
    this.service.reservation = null;
  }

  submit(): void {
    if (this.checkoutForm.invalid) {
      console.log("got here")
      return;
    }
    else {
      let dob = this.checkoutForm.controls['dateOfBirth'].value;
      let dateob = new Date(String(dob));
      let date = dateob.getFullYear() + "-" + (dateob.getMonth() + 1) + "-" + dateob.getDate();
      this.customerObject = {
        firstName:this.checkoutForm.controls['firstName'].value,
        lastName:this.checkoutForm.controls['lastName'].value,
        email:this.checkoutForm.controls['email'].value,
        phoneNumber: this.checkoutForm.controls['phoneNumber'].value,
        dateOfBirth: date,
      }
      console.log("checkout form value", this.customerObject)
      this.service.createCustomer(this.customerObject).subscribe(data => {
        this.customer = data;
        this.customerId = data.id;
        /* Creating a reservation object with the car, customer, start, and end properties. */
      this.reservationObject = {

        car: {
          id: this.service.chosenVehicle.id,
          make: this.service.chosenVehicle.make,
          model: this.service.chosenVehicle.model,
          year: this.service.chosenVehicle.year,
          tier: this.service.chosenVehicle.tier,
        },
        customer: {
          id: this.customerId,
        },
        start: this.service.reservationTimes.dateStart,
        end: this.service.reservationTimes.dateEnd,
      }
        this.service.createReservation(this.reservationObject).subscribe(data => {
          console.log("data",data)
          this.service.reservation = data;

          this.service.reservationTimes = null;
          this.service.chosenVehicle = null;
          this.router.navigateByUrl('/review')
        })
      })
>>>>>>> Stashed changes
    }
  }

  submit(e: any): void {

  }

}
