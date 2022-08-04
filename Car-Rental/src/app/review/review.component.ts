import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {


  service :CarApiService;
  
  constructor(service :CarApiService, private router: Router) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.reservationTimes = null;
    this.service.chosenVehicle = null;
  }

}
