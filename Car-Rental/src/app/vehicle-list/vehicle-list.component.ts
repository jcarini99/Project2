import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  service :CarApiService;
  vehicles :Array<any> = [];

  constructor(service :CarApiService) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.findAllAvailableCars().subscribe( data => {
      this.vehicles = data;
      console.log("vehicles", this.vehicles)
    })
  }
  submit(e :Event) :void {

  }

}
