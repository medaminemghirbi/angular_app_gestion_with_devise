import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  constructor(private http: HttpClient, public router: Router) {

  }

  /************************************************ ADMIN + EMPLOYEE ***************************************************/
  login(data: any): Observable<any> {
    return this.http.post(environment.urlBackend + 'users/sign_in/', data);
  }

  resetPassword(token: any, email: any): Observable<any> {
    return this.http.put(environment.urlBackend + 'password_resets/' + token, email);
  }

  sendResetLink(email: any) {
    return this.http.post(environment.urlBackend + 'password_resets/', email);
  }


  updateimageuser(id: any, data: any): Observable<any> {
    return this.http.patch(environment.urlBackend + 'updateimguser/' + id, data);
  }

  updateinfouser(id: any, data: any): Observable<any> {
    return this.http.patch(environment.urlBackend + 'updateuser/' + id, data);
  }


  logout(): Observable<any> {
    return this.http.delete(environment.urlBackend + 'users/sign_out/')
  }


  /************************************************FOR ADMIN ******************************************************/

  registerAdmin(data: any): Observable<any> {
    return this.http.post(environment.urlBackend + 'users/', data)
  }

  registerEmployee(data: any): Observable<any> {
    return this.http.post(environment.urlBackend + 'createEmployee/', data)
  }

  getAllEmployees() {
    return this.http.get(environment.urlBackend + 'employees/')
  }

  updateEmployee(id: any, newprofile: any) {
    return this.http.patch(environment.urlBackend + 'updateuser/' + id, newprofile)
  }

  deleteEmployee(id: any) {
    return this.http.delete(environment.urlBackend + 'employees/' + id)
  }

  countAllForAdmin(): Observable<any> {
    return this.http.get(environment.urlBackend + 'countall/')
  }

  getemployeedata(id: any): Observable<any> {
    return this.http.get(environment.urlBackend + 'getemployeedata/' + id)
  }

  searchEmployeeByEmail(id: any): Observable<any> {
    return this.http.get(environment.urlBackend + 'getEmployeeByEmail/' + id)
  }





}
