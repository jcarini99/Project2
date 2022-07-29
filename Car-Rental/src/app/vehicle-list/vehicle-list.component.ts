import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  service :CarApiService;

  constructor(service :CarApiService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

}
