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
  messageErr: any;
  searchedKeyword: any;
  p: any;

  dataArrayy: any;
  admindata: any;


  constructor(private demandesServicesService: DemandesServicesService, private usersServicesService: UsersServicesService, private router: Router) {

    this.demandesServicesService.getAllRequests().subscribe(data => {
      // debugger
      console.log(data)
      this.dataArray = data

        , (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found this demande in our database"
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

    //  this.date = moment(Date.now()).format("YYYY-MM-DD"); 
    //  if (data.beginingDate > this.date ) {
    //
    //  }

  };

  calculateDiff(dataF: any, dataD: any) {

    var sdate = moment(this.dataArray.start_date)
    var edate = moment(this.dataArray.end_date)
    var diffInDays = Math.floor(sdate.diff(edate, 'days'));

    //       this.date = moment(Date.now()).format("YYYY-MM-DD"); 

    var dateF = new Date(dataF);
    var dateD = new Date(dataD);

    console.log(dataF, dataD)
    console.log(diffInDays)

    let days = Math.floor((dateF.getDay() - dateD.getDay()));
    var diff = 0 + days
    console.log(diff)
    return diff.toString();


  }

  jourRestant(dataF: any, dataD: any) {
    var dateF = new Date(dataF);
    var dateD = new Date(dataD);

    console.log(dataF, dataD)

    let days = Math.floor((dateF.getDay() - dateD.getDay()));

    var total = 20 - days
    return total;
  }


}

