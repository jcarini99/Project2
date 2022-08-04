import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmEmailValidator, verifyAgeValidator } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {


  service: CarApiService;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  today = new Date();
  dateStart: any;
  dateEnd: any;
  vehicle: any;
  vehicleId: any;
  vehicleMake: any;
  vehicleModel: any;
  vehicleYear: any;
  vehicleTier: any;
  reservation: any = {make: "", model: "", year:""}
  reservationObject: any = {}
  customerObject: any = {}
  customer: Array<any> = [];
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  dateOfBirth: any;
  whatever:any = {};



  // checkoutForm = new FormGroup({
  //   firstName: new FormControl('', [Validators.pattern(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/), Validators.required, Validators.minLength(1)]),
  //   lastName: new FormControl('', [Validators.pattern(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/), Validators.required, Validators.minLength(1)]),
  //   email: new FormControl('', [Validators.email, Validators.required]),
  //   email2: new FormControl('', [Validators.required]),
  //   phoneNumber: new FormControl('', [Validators.pattern(/^\+?\d*$/), Validators.required, Validators.minLength(10)]),
  //   dateOfBirth: new FormControl('', [Validators.required, verifyAgeValidator])
  // }, { validators: [confirmEmailValidator] });

  constructor(service: CarApiService, private router: Router) {
    this.service = service;

  }

  ngOnInit(): void {
    
    if(this.service.reservation != null){
      this.service.findCustomerById(this.service.reservation.customer).subscribe(data => {
        this.service.chosenCustomer = data; 
        this.whatever = this.service.chosenCustomer;
        console.log("chosenCustomer",this.service.chosenCustomer);
        });
        this.reservation = this.service.reservation;
    }else{
      console.log("chosenReservation",this.service.chosenReservation);
      this.service.findReservationByIdAndCustomerId(this.service.chosenReservation.reservationId, this.service.chosenReservation.customerId).subscribe(data => {
      this.reservation = data;
      console.log("reservation", data);
      console.log("reservation", this.reservation);
      })
    }
  }


  updateDateStart(e :any) :void {
    this.dateStart = new Date(e);
  }
  updateDateEnd(e :any) :void {
    this.dateEnd = new Date(e);
  }

  dateCheck(start :any, end :any) :Boolean{
    let newDate = new Date (start)
    newDate = new Date (newDate.setDate(newDate.getDate() + 1))
    if ((end >= newDate))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  submit(): void {
    // if (this.checkoutForm.invalid) {
    //   console.log("got here")
    //   return;
    // }
    // else {
    //   let dob = this.checkoutForm.controls['dateOfBirth'].value;
    //   let dateob = new Date(String(dob));
    //   let date = dateob.getFullYear() + "-" + (dateob.getMonth() + 1) + "-" + dateob.getDate();
    //   this.customerObject = {
    //     firstName:this.checkoutForm.controls['firstName'].value,
    //     lastName:this.checkoutForm.controls['lastName'].value,
    //     email:this.checkoutForm.controls['email'].value,
    //     phoneNumber: this.checkoutForm.controls['phoneNumber'].value,
    //     dateOfBirth: date,
    //   }
    //   console.log("checkout form value", this.customerObject)
    //   this.service.createCustomer(this.customerObject).subscribe(data => {
    //     this.customer = data;
    //     this.customerId = data.id;
    //     /* Creating a reservation object with the car, customer, start, and end properties. */
    //   this.reservationObject = {

    //     car: {
    //       id: this.service.chosenVehicle.id,
    //       make: this.service.chosenVehicle.make,
    //       model: this.service.chosenVehicle.model,
    //       year: this.service.chosenVehicle.year,
    //       tier: this.service.chosenVehicle.tier,
    //     },
    //     customer: {
    //       id: this.customerId,
    //     },
    //     start: this.service.reservationTimes.dateStart,
    //     end: this.service.reservationTimes.dateEnd,
    //   }
    //     this.service.updateReservation(this.reservationObject).subscribe(data => {
    //       this.reservation = data;
    //     })
    //   })
    // }

  }

  alterDate(start: any, end: any): void {
    const myArray = start.split("-");
    const myArray2 = end.split("-");
    this.dateStart = myArray[1] + "-" + myArray[2] + "-" + myArray[0]
    this.dateEnd = myArray2[1] + "-" + myArray2[2] + "-" + myArray2[0]
  }

  
 formatDoB(DoB: any):void {
  const myArray = DoB.split("-");
  this.dateOfBirth = myArray[1] + "-" + myArray[2] + "-" + myArray[0];
 }

  // showDoBError() {
  //   if (!this.checkoutForm.value.dateOfBirth) return true;
  //   return false;
  // }


  updateDate(e: any): void {
    /*
    console.log("checkoutform", this.checkoutForm.value.dob)
    const datePicked = new Date(String(this.checkoutForm.value.dob))
    const diffTime = Math.abs((Date.now() - datePicked.getTime()))
    const age = Math.floor(diffTime / (1000 * 3600 * 24) / 365.25);
    */
  }
  
}
