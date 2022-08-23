import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import Swal from 'sweetalert2';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-requests-accepted',
  templateUrl: './requests-accepted.component.html',
  styleUrls: ['./requests-accepted.component.css']
})
export class RequestsAcceptedComponent  {
 
  dataArray: any;

  messageErr: any;
  
  searchedKeyword: any ;

  p : any = 1 ;


  constructor(private demandesServicesService:DemandesServicesService,private router:Router) {

    
    this.demandesServicesService.getrequestacceptedbyemployee().subscribe(data=>{
      // debugger
    //  sessionStorage.setItem( 'requestdetails', JSON.stringify( data ) );

      console.log(data) 
      this.dataArray=data 
     , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this request in our database"} 
    }) 
    


  }



  

}
