import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  service: CarApiService;
  vehicles: Array<any> = [];
  pageHidden: Boolean = true;
  loadingIcon: Boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(service: CarApiService, private router: Router) {
    this.service = service;
  }

  ngOnInit(): void {
    console.log("dateStart", this.service.reservationTimes.dateStart)
    if (this.service.reservationTimes.dateStart == null || this.service.reservationTimes.dateEnd == null) {
      this.router.navigateByUrl('/home')
    }
    else {
      this.service.findAllAvailableCars().subscribe(data => {
        this.vehicles = data;
        console.log("vehicles", this.vehicles)
      })
      this.onReady(this.callback)
    }
    this.service.reservation = null;
  }
  onReady(callback :Function) :void {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByClassName('vehicle')[0] != undefined) {
        window.clearInterval(intervalId);
        callback();
      }
    }, 5000);
  }

  callback = () => {
    this.pageHidden =  !this.pageHidden
    this.loadingIcon = true
  }


  submit(e: any): void {
    this.service.chosenVehicle = {
      id: e.target.getAttribute("data-vehicle-id"),
      make: e.target.getAttribute("data-vehicle-make"),
      model: e.target.getAttribute("data-vehicle-model"),
      year: e.target.getAttribute("data-vehicle-year"),
      tier: e.target.getAttribute("data-vehicle-tier")
    }
    this.router.navigateByUrl('/customers')
    
  }

}
