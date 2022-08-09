import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-request',
  templateUrl: './generate-request.component.html',
  styleUrls: ['./generate-request.component.css']
})
export class GenerateRequestComponent {

  dataArray: any;
  messageErr: any;
  requestdetails: any;
  docDefinition: any;
  employeedata: any;

  constructor(private demandesServicesService: DemandesServicesService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.requestdetails = JSON.parse(sessionStorage.getItem('requestdetails')!);

    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);

    this.demandesServicesService.getrequestdata(this.activatedRoute.snapshot.params['id']).subscribe((data: any) => {
      sessionStorage.setItem('requestdetails', JSON.stringify(data));

      console.log(data)
      this.dataArray = data,

        (err: HttpErrorResponse) => {
          console.log(err)
          this.messageErr = "We dont't found this request in our database"
        }

    })

  }

  download() {
    this.docDefinition = {
     
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
          columns: [
            [
              {
                text: "Full Name : " + this.employeedata.user.last_name + " " + this.employeedata.user.first_name,
                bold: true
              },
              { text: "Email : " + this.employeedata.user.email },
              { text: "Solde : " + this.employeedata.user.solde },
              { text: "Phone Number : " + this.employeedata.user.phone },
              { text: "Address : " + this.employeedata.user.address }
            ],
            [

            ]
          ]
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
              { text: "Start_date : " + this.requestdetails.map(function (a: any) { return a.start_date; }) },
              { text: "End_date : " + this.requestdetails.map(function (a: any) { return a.end_date; }) },
              { text: "Reason : " + this.requestdetails.map(function (a: any) { return a.reason; }) },
              { text: "Motif_refused : " + this.requestdetails.map(function (a: any) { return a.motif_refused; }) }
            ],
            [

            ]
          ]
        },
        {
          columns: [
            [{ qr: "oumaima", fit: '45' , alignment: 'right' }],
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
