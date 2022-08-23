import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent  {

  dataArray: any;
  dataArrayy: any;

  messageErr: any;
  searchedKeyword: any;

  p: any = 1 ;

  admindata: any;


  constructor(private demandesServicesService: DemandesServicesService, private usersServicesService: UsersServicesService, private router: Router) {

    this.demandesServicesService.getAllRequests().subscribe(data => {
  
      console.log(data)
      this.dataArray = data

        , (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found this request in our database"
        }
    })

    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)

    this.usersServicesService.countAllForAdmin().subscribe(result => {

      this.dataArrayy = result

      console.log(this.dataArrayy),

        (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found in our database"
        }
    })

  };

}

