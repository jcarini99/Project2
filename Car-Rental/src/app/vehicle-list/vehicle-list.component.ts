import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  service :CarApiService;
  vehicles :Array<any> = [];

  constructor(service :CarApiService, private router: Router) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.findAllAvailableCars().subscribe( data => {
      this.vehicles = data;
      console.log("vehicles", this.vehicles)
    })
  }

  submit(e :any) :void {
    this.service.chosenVehicle = {id: e.target.getAttribute("data-vehicle-id")}
    this.router.navigateByUrl('/customers')
  }

}
