import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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
  p: any = 1;
  employeedata: any;
  messageError: any;
  messageSuccess: any;
  updaterequest: any;
  requestdetails: any;
  docDefinition: any;

  dataArrayyy: any;
  date: any;


  constructor(private demandesServicesService: DemandesServicesService, private usersServicesService: UsersServicesService, private router: Router) {

    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata.id)

    this.requestdetails = JSON.parse(sessionStorage.getItem('requestdetails')!);


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

    this.updaterequest = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),

    });

  }

  ngOnInit(): void {
    this.demandesServicesService.getRequestsByID(this.employeedata.id).subscribe(data => {
      // debugger
      sessionStorage.setItem('requestdetails', JSON.stringify(data));

      console.log(data)


      //  var i = 1;
      /*  for (let i = 0 ; i <= data; i++) {
          console.log(i);
          
          var days = Math.floor(data.user.solde - (data.end_date.getDay() - data.start_date.getDay()))  ;
          i += 1;
          console.log(i);
          console.log(days);
        //  this.dataArrayyy = days
          console.log(days);
  
        }
        */
      this.dataArray = data,
        // this.calculateDiff(this.dataArray.end_date, this.dataArray.start_date)
        (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found this demande in our database"
        }
    })

    // this.calcul()

  }

  calcul() {
    this.demandesServicesService.getRequestsByID(this.employeedata.id).subscribe(data => {

      var i = 1;
      for (i > 1; i <= data; i++) {
        console.log(i);
        var days = Math.floor(data.user.solde - (data.end_date.getDay() - data.start_date.getDay()));

        i += 1;
        console.log(i);
        console.log(days);
        this.dataArrayyy = days
        console.log(this.dataArrayyy);

      }
      this.dataArrayyy = data

      // this.calculateDiff(this.dataArray.end_date, this.dataArray.start_date)


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

  dataRequest = {
    id: '',
    start_date: '',
    end_date: '',
    reason: '',
    description: ''

  }

  getdata(start_date: string, end_date: string, reason: string, description: string, id: any) {
    this.messageSuccess = ''
    this.dataRequest.start_date = start_date
    this.dataRequest.end_date = end_date
    this.dataRequest.reason = reason
    this.dataRequest.description = description
    this.dataRequest.id = id

    console.log(this.dataRequest)

  }

  updaterequests(f: any) {
    let data = f.value
    const formData = new FormData();
    formData.append('start_date', this.updaterequest.value.start_date);
    formData.append('end_date', this.updaterequest.value.end_date);
    formData.append('reason', this.updaterequest.value.reason);
    formData.append('description', this.updaterequest.value.description);

    this.date = moment(Date.now()).format("YYYY-MM-DD");
    if (data.start_date > this.date) {

      if (data.start_date <= data.end_date) {

        this.demandesServicesService.updateRequestByEmployee(this.dataRequest.id, formData).subscribe((response: any) => {
          console.log(response)

          Swal.fire('Whooa !', 'Request Succeffully updated !', 'success')
         // window.location.reload();


        }, (err: HttpErrorResponse) => {
          console.log(err.message)
          this.messageError = "champs required or not valid !"
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'champs required or not valid !',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Start Date must be before End Date !',

          showConfirmButton: false,
          timer: 1500
        })
      }

    }
    else {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start Date must be after current date !',

        showConfirmButton: false,
        timer: 1500
      })
    }


  }

  download() {
    this.docDefinition = {
      /*header: 'Resume',*/
      content: [
        {
          text: `Date: ${new Date().toLocaleString()}`,
          alignment: 'right'
        },
        {
          text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
          alignment: 'right'
        },
        {
          text: ' Request System',
          decoration: 'underline',
          fontSize: 20,
          alignment: 'center',
          color: '#047886'
        },



        {
          text: 'Employee Details',
          style: 'sectionHeader'
        },



        {
          text: 'Request Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: "Request Status : " + this.requestdetails.map(function (a: any) { return a.status; }),
                bold: true
              },
              { text: "start_date : " + this.requestdetails.map(function (a: any) { return a.start_date; }) },
              { text: "end_date : " + this.requestdetails.map(function (a: any) { return a.end_date; }) },
              { text: "reason : " + this.requestdetails.map(function (a: any) { return a.reason; }) },
              { text: "motif_refused : " + this.requestdetails.map(function (a: any) { return a.motif_refused; }) }
            ],
            [

            ]
          ]
        },
        {
          columns: [
            [{ qr: "oumaima", fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },




      ],

      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    pdfMake.createPdf(this.docDefinition).open();

  }

}
