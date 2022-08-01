import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  reservationTimes :any;

  http :HttpClient;

  constructor(http :HttpClient) { 
    this.http = http;
  }

  findAllAvailableCars() :Observable<any> {
    return this.http.get(environment.apiUrl + 'cars/available/?dateStart=' + this.reservationTimes.dateStart + '&dateEnd=' + this.reservationTimes.dateEnd);
  }
}
