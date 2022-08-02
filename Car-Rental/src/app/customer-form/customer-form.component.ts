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
      this.alterDate(this.dateStart, this.dateEnd);
    }
  }

  submit(e: any): void {

  }

  alterDate(start :any, end :any) :void {
    const myArray = start.split("-");
    const myArray2 = end.split("-");
    this.dateStart = myArray[1] + "-" + myArray[2] + "-" + myArray[0]
    this.dateEnd = myArray2[1] + "-" + myArray2[2] + "-" + myArray2[0]
  }
}
