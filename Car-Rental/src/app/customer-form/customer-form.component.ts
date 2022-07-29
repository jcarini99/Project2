import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  service :CarApiService;

  constructor(service :CarApiService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

}
