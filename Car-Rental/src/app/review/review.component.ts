import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmEmailValidator, verifyAgeValidator } from '../customer-form/customer-form.component';
import { DatePipe } from '@angular/common'

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
  reservation: any = {
    car:{make: "", model: "", year:""}
  }
  reservationObject: any = {}
  customerObject: any = {}
  customer: Array<any> = [];
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  dateOfBirth: any;
  resUpdate:any = {};
  customerArray:any ={};
  


  constructor(service: CarApiService, private router: Router, public datepipe: DatePipe) {
    this.service = service;
  }

  ngOnInit(): void {
    if (this.service.pageSwitch == false){
        this.router.navigateByUrl('/home') // makes sure page cannot reload without reservation contents
    }
    if(this.service.reservation != null){
      this.service.findCustomerById(this.service.reservation.customer).subscribe(data => {
        this.service.chosenCustomer = data; 
        this.customerArray = this.service.chosenCustomer;
        console.log("chosenCustomer",this.service.chosenCustomer);
        });
        this.reservation = this.service.reservation;
    }else{
      console.log("chosenReservation",this.service.chosenReservation);
      this.service.findReservationByIdAndCustomerId(this.service.chosenReservation.reservationId, this.service.chosenReservation.customerId).subscribe(data => {
        console.log("data", data)
      this.reservation = data;
      this.reservation.customer = {id: data.customer};
      let start = new Date(this.reservation.start)
      this.dateStart = this.datepipe.transform(start, 'MM-dd-yyyy');
      let end = new Date(this.reservation.end)
      this.dateEnd = this.datepipe.transform(end, 'MM-dd-yyyy')

      this.service.findCustomerById(this.reservation.customer.id).subscribe(custData => {
        this.service.chosenCustomer = custData; 
        this.customerArray = this.service.chosenCustomer;
        console.log("chosenCustomerNew", this.service.chosenCustomer);
        });
      console.log("reservationData", data);
      console.log("reservation", this.reservation);

      })
    }
    

  }



  updateDateStart(e :any) :void {
    this.dateStart = new Date(e);
    this.reservation.start = this.datepipe.transform(this.dateStart, 'yyyy-MM-dd');
    this.dateStart = this.datepipe.transform(this.dateStart, 'MM-dd-yyyy');
  }
  updateDateEnd(e :any) :void {
    this.dateEnd = new Date(e);
    this.reservation.end = this.datepipe.transform(this.dateEnd, 'yyyy-MM-dd');
    this.dateEnd = this.datepipe.transform(this.dateEnd, 'MM-dd-yyyy');    
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

  alterDate(start: any, end: any): void {
    const myArray = start.split("-");
    const myArray2 = end.split("-");
    this.dateStart = myArray[1] + "-" + myArray[2] + "-" + myArray[0]
    this.dateEnd = myArray2[1] + "-" + myArray2[2] + "-" + myArray2[0]
  }

  formatDate(date: any) :void {
    this.datepipe.transform(date, 'mm-dd-yyyy');
    
  }

  updateDate(e: any): void {
    /*
    console.log("checkoutform", this.checkoutForm.value.dob)
    const datePicked = new Date(String(this.checkoutForm.value.dob))
    const diffTime = Math.abs((Date.now() - datePicked.getTime()))
    const age = Math.floor(diffTime / (1000 * 3600 * 24) / 365.25);
    */
  }

  updateReservation(reservation :any){
    console.log("ResBeforeUpdate", reservation)
    this.service.updateReservation(reservation).subscribe(data => {
       this.resUpdate = data;
       if (this.resUpdate)
       {
        this.service.reservation = this.resUpdate;
        console.log("ReservationAfterUpdate",this.resUpdate)
       }
       else
       {
        
       }
       console.log("update Result", this.resUpdate)
      this.service.pageSwitch = false;
      if (this.service.reserveConfirmation){
        this.service.reserveConfirmation = false;
      }
      this.service.updateConfirmation = true; // Use this boolean to make a confirmation message appear on /home using ngIf* = "service.updateConfirmation"
      this.router.navigateByUrl('/home')
    });
    
  }

  deleteReservation(id :number){
    this.service.deleteReservation(id).subscribe(data => {});
    this.service.pageSwitch = false;
    if (this.service.reserveConfirmation){
      this.service.reserveConfirmation = false;
    }
    this.service.deleteConfirmation = true; // Use this boolean to make a confirmation message appear on /home using ngIf* = "service.deleteConfirmation"
    this.router.navigateByUrl('/home')

  }
  
}
