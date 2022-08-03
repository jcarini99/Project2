import { Component, OnInit, ViewChild } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export const confirmEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email');
  const email2 = control.get('email2');

  return email && email2 && email.value === email2.value ? null : { email2: false };
};

export const verifyAgeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log("got here");
  const value = control.value;
  // const datePicked = new Date(String(control.get('dob')?.value))
  if (!value) {
    return { isValidDob: false };
  }
  const diffTime = Math.abs((Date.now() - value.getTime()));
  const age = Math.floor(diffTime / (1000 * 3600 * 24) / 365.25);

  console.log("age", age)
  return value && age >= 18 ? null : { isValidDob: false };
};

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})

export class CustomerFormComponent implements OnInit {

  service: CarApiService;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  dateStart: any;
  dateEnd: any;
  vehicle: any;
  vehicleId: any;
  vehicleMake: any;
  vehicleModel: any;
  vehicleYear: any;
  vehicleTier: any;
  reservation: any = {}
  reservationObject: any = {}
  customerObject: any = {}
  customer: Array<any> = [];
  customerId: number = 0;

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.pattern(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/), Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.pattern(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/), Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    email2: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(/^\+?\d*$/), Validators.required, Validators.minLength(10)]),
    dateOfBirth: new FormControl('', [Validators.required, verifyAgeValidator])
  }, { validators: [confirmEmailValidator] });

  constructor(service: CarApiService, private router: Router) {
    this.service = service;

  }

  ngOnInit(): void {
    if (this.service.reservationTimes.dateStart == null || this.service.reservationTimes.dateEnd == null) {
      this.router.navigateByUrl('/home')
    }
    else if ((this.service.reservationTimes.dateStart != null && this.service.reservationTimes.dateEnd != null) && this.service.chosenVehicle.id == null) {
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
      this.alterDate(this.dateStart, this.dateEnd);
    }
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
          this.reservation = data;
        })
      })
    }

  }

  alterDate(start: any, end: any): void {
    const myArray = start.split("-");
    const myArray2 = end.split("-");
    this.dateStart = myArray[1] + "-" + myArray[2] + "-" + myArray[0]
    this.dateEnd = myArray2[1] + "-" + myArray2[2] + "-" + myArray2[0]
  }

  updateDate(e: any): void {
    /*
    console.log("checkoutform", this.checkoutForm.value.dob)
    const datePicked = new Date(String(this.checkoutForm.value.dob))
    const diffTime = Math.abs((Date.now() - datePicked.getTime()))
    const age = Math.floor(diffTime / (1000 * 3600 * 24) / 365.25);
    */
  }

  showDoBError() {
    if (!this.checkoutForm.value.dateOfBirth) return true;
    return false;
  }

}
