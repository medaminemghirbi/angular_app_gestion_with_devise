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
    return this.http.post(environment.urlBackend + 'addRequest/', data)
  }

  getRequestsByID(user_id: any): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestsbyid/' + user_id)
  }

  updateRequestByEmployee(id: any, data: any): Observable<any> {
    return this.http.patch(environment.urlBackend + 'updateRequestByEmployee/' + id, data)
  }

  getrequestdata(id: any): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestdata/' + id)
  }

  getRequestsByIDAccepted(user_id: any): Observable<any> {
    return this.http.get(environment.urlBackend + 'getRequestsByIdAccepted/' + user_id)
  }

  /************************************************FOR ADMIN ******************************************************/

  getAllRequests(): Observable<any> {
    return this.http.get(environment.urlBackend + 'requests/')
  }

  updateRequest(id: any, data: any): Observable<any> {
    return this.http.patch(environment.urlBackend + 'requests/' + id, data)
  }

  getrequestinprogressbyemployee(): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestinprogressbyemployee/')
  }

  getrequestacceptedbyemployee(): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestacceptedbyemployee/')
  }

  getrequestrefusedbyemployee(): Observable<any> {
    return this.http.get(environment.urlBackend + 'getrequestrefusedbyemployee/')
  }

  /************************************************FOR ADMIN AND EMPLOYEE ******************************************/

  deleteRequest(id: any): Observable<any> {
    return this.http.delete(environment.urlBackend + 'requests/' + id)
  }


}
