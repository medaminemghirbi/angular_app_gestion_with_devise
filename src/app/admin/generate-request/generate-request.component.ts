import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';

import * as pdfMake from'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-request',
  templateUrl: './generate-request.component.html',
  styleUrls: ['./generate-request.component.css']
})
export class GenerateRequestComponent {

  dataArrayy: any;
  messageErr: any;
  requestdetails: any;
  docDefinition : any ;

  constructor(private demandesServicesService: DemandesServicesService, private usersServicesService: UsersServicesService, private router: Router , private activatedRoute: ActivatedRoute ) {

    this.requestdetails = JSON.parse( sessionStorage.getItem('requestdetails') !);

    this.demandesServicesService.getrequestdata(this.activatedRoute.snapshot.params['id']).subscribe((data : any )=>{
      sessionStorage.setItem( 'requestdetails', JSON.stringify( data ) );
      console.log(data)
      this.dataArrayy = data ,
       (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this user in our database"} 
      //console.log(this.dataArray)
    }) 

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
