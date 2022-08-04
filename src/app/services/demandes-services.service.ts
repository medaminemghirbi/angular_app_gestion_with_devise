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

  getAllDemandes(): Observable<any>  {
    return this.http.get(environment.urlBackend + 'demandes/')
  }

  deleteDemande(id: any): Observable<any> {
    return this.http.delete(environment.urlBackend + 'demandes/' + id)
  }

  updateDemande(id: any, data: any): Observable<any> {
    return this.http.delete(environment.urlBackend + 'demandes/' + id, data)
  }


}
