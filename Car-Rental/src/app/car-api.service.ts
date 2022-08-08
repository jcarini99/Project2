import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  reservationTimes :any = null;
  
  chosenVehicle :any = null;

  chosenReservation :any = {reservationId: null,
                            customerId: null};

                          

  chosenCustomer :any                          


  reservation :any = null;
  http :HttpClient;
  pageSwitch: boolean = false;

  constructor(http :HttpClient) { 
    this.http = http;
  }


  createReservation(reservation :any) :Observable<any>{
    return this.http.post(environment.apiUrl +'reservations', reservation);
  }
  createCustomer(customer :any) :Observable<any> {
    return this.http.post(environment.apiUrl + 'customers/', customer);
  }
  findAllAvailableCars() :Observable<any> {
    return this.http.get(environment.apiUrl + 'cars/available/?dateStart=' + this.reservationTimes.dateStart + '&dateEnd=' + this.reservationTimes.dateEnd);
  }

  findCustomerById(id :number) :Observable<any>{
    return this.http.get(environment.apiUrl + 'customers/' + id)
  }
  /*
  findReservation(id :number, lname :string) :Observable<any> {
    return this.http.get(environment.apiUrl + 'reservations/' + id + '/' + lname)
  }
  findReservationById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl + 'reservations/' + id)
  }
  */
  findReservationByIdAndCustomerId(id :number, customerId :number) :Observable<any>{
    return this.http.get(environment.apiUrl + 'reservations/' + id + '/' + customerId);
  }

  updateReservation(reservation :any) :Observable<any> {
    return this.http.put(environment.apiUrl + 'reservations/' + reservation.id, reservation);
  }

  deleteReservation(reservation :number) :Observable<any> {
    console.log("reservationIdService", reservation)
    return this.http.delete(environment.apiUrl + 'reservations/' + reservation)
  }
}
