import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list-requests',
  templateUrl: './employee-list-requests.component.html',
  styleUrls: ['./employee-list-requests.component.css']
})
export class EmployeeListRequestsComponent implements OnInit {

  dataArrayy: any;
  messageErr: any;
  dataArray: any;
  searchedKeyword: any;
  p: any;
  employeedata: any;

  constructor(private demandesServicesService: DemandesServicesService, private usersServicesService: UsersServicesService, private router: Router) {

    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata.id)
    

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

  ngOnInit(): void {
    this.demandesServicesService.getRequestsByID(this.employeedata.id).subscribe(data => {
      // debugger
      console.log(data)
      this.dataArray = data

        // this.calculateDiff(this.dataArray.end_date, this.dataArray.start_date)

        , (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found this demande in our database"
        }
    })

  }

  calculateDiff(dataF: any, dataD: any) {

    var sdate = moment(this.dataArray.start_date)
    var edate = moment(this.dataArray.end_date)
    var diffInDays = Math.floor(sdate.diff(edate, 'days'));

    //       this.date = moment(Date.now()).format("YYYY-MM-DD"); 

    var dateF = new Date(dataF);
    var dateD = new Date(dataD);

   // console.log(dataF, dataD)
   // console.log(diffInDays)

    let days = Math.floor((dateF.getDay() - dateD.getDay()));
    var diff = 0 + days
  //  console.log(diff)
    return diff.toString();


  }

  jourRestant(dataF: any, dataD: any) {
    var dateF = new Date(dataF);
    var dateD = new Date(dataD);

   // console.log(dataF, dataD)

    let days = Math.floor((dateF.getDay() - dateD.getDay()));

    var total = 20 - days
    return total;
  }

  delete(id: any, i: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandesServicesService.deleteRequest(id).subscribe(response => {
          console.log(response)
          this.dataArray.splice(i, 1)


        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload();


      }
    })


  }

}
