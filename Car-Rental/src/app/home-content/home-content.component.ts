import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  service :CarApiService;
  value = 'Pennsylvania, PA';
  today = new Date();
  dateStart :any;
  dateEnd :any;
  VEC :boolean = false;

  constructor(service :CarApiService, private router: Router) {
    this.service = service;
   }

  ngOnInit(): void {
  }
  updateDateStart(e :any) :void {
    this.dateStart = new Date(e);
  }
  updateDateEnd(e :any) :void {
    this.dateEnd = new Date(e);
  }
  submit() :void{
    let inRange = this.dateCheck(this.dateStart, this.dateEnd)
    if (inRange)
    {
      this.dateStart = this.dateStart.getFullYear() + "-" + (this.dateStart.getMonth() + 1) + "-" + this.dateStart.getDate();
      this.dateEnd = this.dateEnd.getFullYear() + "-" + (this.dateEnd.getMonth() + 1) + "-" + this.dateEnd.getDate();
      this.service.reservationTimes={dateStart: this.dateStart,
                                      dateEnd: this.dateEnd}
      this.router.navigateByUrl('/cars')
    }
  }
/**
 * If the end date is greater than or equal to the start date plus one day, return true, otherwise
 * return false.
 * @param {any} start - the start date
 * @param {any} end - the end date
 * @returns A boolean value.
 */
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

  ViewEditCancel(){
    this.VEC = !this.VEC;
  }
  
  // Check if Reservation ID matches Last Name for any reservation and redirect to the checkout page for View / Edit / Cancel
  VECsubmit() :void{

  }
}
