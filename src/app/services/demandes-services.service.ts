import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandesServicesService {

  constructor(private http: HttpClient, public router: Router) {

  }


  /************************************************FOR EMPLOYEE ******************************************************/
  addRequest(data: any): Observable<any> {
    return this.http.post(environment.urlBackend + 'requests/', data)
  }

  getRequestsByID (user_id : any ): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestsbyid/' + user_id )
  }

    /************************************************FOR ADMIN ******************************************************/

  getAllRequests(): Observable<any> {
    return this.http.get(environment.urlBackend + 'requests/')
  }

  deleteRequest (id: any): Observable<any> {
    return this.http.delete(environment.urlBackend + 'requests/' + id)
  }

  updateRequest (id: any, data: any): Observable<any> {
    return this.http.patch(environment.urlBackend + 'requests/' + id, data)
  }


}