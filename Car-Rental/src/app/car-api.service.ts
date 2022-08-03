import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  reservationTimes :any = {dateStart: null,
                          dateEnd: null};
  chosenVehicle :any = {id: null,
                        make: null,
                        model: null,
                        year: null,
                        tier: null}; 
  


  http :HttpClient;

  constructor(http :HttpClient) { 
    this.http = http;
  }
  createReservation(reservation :any) :Observable<any>{
    return this.http.post(environment.apiUrl +'/reservations', reservation)
  }
  createCustomer(customer :any) :Observable<any> {
    return this.http.post(environment.apiUrl + 'customers/', customer)
  }
  findAllAvailableCars() :Observable<any> {
    return this.http.get(environment.apiUrl + 'cars/available/?dateStart=' + this.reservationTimes.dateStart + '&dateEnd=' + this.reservationTimes.dateEnd);
  }
}
