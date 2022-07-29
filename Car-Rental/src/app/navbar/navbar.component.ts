import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  service :CarApiService;

  constructor(service :CarApiService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

}
