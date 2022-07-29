import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  service :CarApiService;

  constructor(service :CarApiService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

}
