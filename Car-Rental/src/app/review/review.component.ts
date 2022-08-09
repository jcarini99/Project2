import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmEmailValidator, verifyAgeValidator } from '../customer-form/customer-form.component';
import { DatePipe } from '@angular/common'
import { ThisReceiver } from '@angular/compiler';

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
    car: { make: "", model: "", year: "" }
  }
  reservationObject: any = {}
  customerObject: any = {}
  customer: Array<any> = [];
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  dateOfBirth: any;
  resUpdate: any = {};
  customerArray: any = {};
  dateStartAlter: any;
  dateEndAlter: any;
  serializedDate: any;
  //editing :boolean;



  constructor(service: CarApiService, private router: Router, public datepipe: DatePipe) {
    this.service = service;
    //this.editing = this.service.editing;
  }

  ngOnInit(): void {
    if (this.service.pageSwitch == false) {
      this.router.navigateByUrl('/home') // makes sure page cannot reload without reservation contents
    }
    if (this.service.reservation != null && this.service.editing == false) {
      this.service.findCustomerById(this.service.reservation.customer).subscribe(data => {
        this.service.chosenCustomer = data;
        this.customerArray = this.service.chosenCustomer;
        console.log("chosenCustomer", this.service.chosenCustomer);
      });
      this.reservation = this.service.reservation;
      this.reservation.customer = { id: this.service.reservation.customer };
      let start = new Date(this.reservation.start)
      this.dateStart = this.datepipe.transform(start, 'MM-dd-yyyy');
      let end = new Date(this.reservation.end)
      this.dateEnd = this.datepipe.transform(end, 'MM-dd-yyyy')

      this.dateStartAlter = start

      this.dateEndAlter = end;
      this.service.reservationTimes = {
        dateStart: this.reservation.start,
        dateEnd: this.reservation.end,
      }
      this.service.tempDate = {
        start: this.service.reservation.start,
        end: this.service.reservation.end,
        customer: { id: this.service.reservation.customer },
        car: {
          id: this.service.reservation.car.id,
          make: this.service.reservation.car.make,
          model: this.service.reservation.car.model,
          year: this.service.reservation.car.year,
          tier: this.service.reservation.car.tier,
        }
      }

    } else if (this.service.reservation == null && this.service.editing == false) {
      console.log("chosenReservation", this.service.chosenReservation);
      this.service.findReservationByIdAndCustomerId(this.service.chosenReservation.reservationId, this.service.chosenReservation.customerId).subscribe(data => {
        console.log("data", data)
        this.reservation = data;
        this.service.reservation = data;
        this.service.tempDate = {
          start: data.start,
          end: data.end,
          customer: { id: data.customer },
          car: {
            id: data.car.id,
            make: data.car.make,
            model: data.car.model,
            year: data.car.year,
            tier: data.car.tier,
          }
        }
        console.log("got here again after cancel")
        this.service.reservationTimes = {
          dateStart: data.start,
          dateEnd: data.end
        }
        console.log("res times", this.service.reservationTimes)
        this.reservation.customer = { id: data.customer };
        let start = new Date(this.reservation.start)
        this.dateStart = this.datepipe.transform(start, 'MM-dd-yyyy');
        let end = new Date(this.reservation.end)
        this.dateEnd = this.datepipe.transform(end, 'MM-dd-yyyy')

        this.dateStartAlter = start

        this.dateEndAlter = end;


        this.service.findCustomerById(this.reservation.customer.id).subscribe(custData => {
          this.service.chosenCustomer = custData;
          this.customerArray = this.service.chosenCustomer;
          console.log("chosenCustomerNew", this.service.chosenCustomer);
        });
        console.log("reservationData", data);
        console.log("reservation", this.reservation);

      })
    }
    else if (this.service.reservation != null && this.service.editing == true) {
      console.log("chosenReservation", this.service.chosenReservation);
      this.service.findReservationByIdAndCustomerId(this.service.chosenReservation.reservationId, this.service.chosenReservation.customerId).subscribe(data => {
        console.log("data", data)
        this.reservation = data;
        this.reservation.start = this.service.reservationTimes.dateStart
        this.reservation.end = this.service.reservationTimes.dateEnd
        this.reservation.customer = { id: data.customer };
        this.reservation.car.id = this.service.chosenVehicle.id
        this.reservation.car.make = this.service.chosenVehicle.make
        this.reservation.car.model = this.service.chosenVehicle.model
        this.reservation.car.year = this.service.chosenVehicle.year
        this.reservation.car.tier = this.service.chosenVehicle.tier
        let start = new Date(this.reservation.start)
        this.dateStart = this.datepipe.transform(start, 'MM-dd-yyyy');
        let end = new Date(this.reservation.end)
        this.dateEnd = this.datepipe.transform(end, 'MM-dd-yyyy')

        this.dateStartAlter = start

        this.dateEndAlter = end;

        this.service.findCustomerById(this.reservation.customer.id).subscribe(custData => {
          this.service.chosenCustomer = custData;
          this.customerArray = this.service.chosenCustomer;
          console.log("chosenCustomerNew", this.service.chosenCustomer);
        });
      })
    }


  }

  //what if user decides to cancel reservation editing need a way to restore back to original values

  updateDateStart(e: any): void {
    this.dateStart = new Date(e);
    this.dateStartAlter = new Date(this.dateStart.getFullYear() + "-" + (this.dateStart.getMonth() + 1) + "-" + this.dateStart.getDate());
    this.reservation.start = this.dateStartAlter.getFullYear() + "-" + (this.dateStartAlter.getMonth() + 1) + "-" + this.dateStartAlter.getDate();
    this.service.reservationTimes.dateStart = this.reservation.start
    this.dateStart = this.datepipe.transform(this.dateStart, 'MM-dd-yyyy');
  }
  updateDateEnd(e: any): void {
    this.dateEnd = new Date(e);
    this.dateEndAlter = new Date(this.dateEnd.getFullYear() + "-" + (this.dateEnd.getMonth() + 1) + "-" + this.dateEnd.getDate());
    this.reservation.end = this.dateEndAlter.getFullYear() + "-" + (this.dateEndAlter.getMonth() + 1) + "-" + this.dateEndAlter.getDate();
    this.service.reservationTimes.dateEnd = this.reservation.end
    this.dateEnd = this.datepipe.transform(this.dateEnd, 'MM-dd-yyyy');
  }

  dateCheck(start: any, end: any): Boolean {
    let newDate = new Date(start)
    newDate = new Date(newDate.setDate(newDate.getDate() + 1))
    if ((end >= newDate)) {
      return true;
    }
    else {
      return false;
    }
  }

  alterDate(start: any, end: any): void {
    // const myArray = start.split("-");
    // const myArray2 = end.split("-");

    console.log("date", this.dateStartAlter)
  }

  formatDate(date: any): void {
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

  updateReservation(reservation: any) {
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
        alert("pick new car")
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

  deleteReservation(id: number) {
    this.service.deleteReservation(id).subscribe(data => { });
    this.service.pageSwitch = false;
    if (this.service.reserveConfirmation) {
      this.service.reserveConfirmation = false;
    }
    this.service.deleteConfirmation = true; // Use this boolean to make a confirmation message appear on /home using ngIf* = "service.deleteConfirmation"
    this.router.navigateByUrl('/home')

  }

  enableEditing(): void {

    this.service.editing = true;
  }
  redirect(): void {
    this.router.navigateByUrl('/cars')
  }

  cancelEditing(): void {
    this.reservation = this.service.tempDate
    let start = new Date(this.reservation.start)
    this.dateStart = this.datepipe.transform(start, 'MM-dd-yyyy');
    let end = new Date(this.reservation.end)
    this.dateEnd = this.datepipe.transform(end, 'MM-dd-yyyy')
    this.dateStartAlter = start
    this.dateEndAlter = end;
    this.service.editing = false;

  }
}
