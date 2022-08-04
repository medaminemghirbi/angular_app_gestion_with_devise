import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  public connecte : boolean = false ; 
  logged_in : boolean = false ; 
  
  constructor(private http : HttpClient , public router: Router ) {

  }

  login(data:any): Observable<any> {
    this.logged_in = true ;
    this.connecte = true;
    return this.http.post(environment.urlBackend + 'users/sign_in/', data);
  }

  register(data:any) : Observable<any>  {
    return this.http.post(environment.urlBackend + 'admin/' , data)
  }

  getAllEmployees () {
    return this.http.get(environment.urlBackend + 'employees/' )
  }
  
  updateEmployee (id : any , newprofile : any )  {
    return this.http.patch(environment.urlBackend + 'employees/' + id  , newprofile )
  }

  deleteEmployee (id : any ) {
    return this.http.delete(environment.urlBackend + 'employees/' + id )
  }
  
  countAllForAdmin () : Observable<any>  {
    return this.http.get(environment.urlBackend + 'countall/' )
  }

  

}
