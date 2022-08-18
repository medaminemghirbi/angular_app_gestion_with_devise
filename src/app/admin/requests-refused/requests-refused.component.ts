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
  selector: 'app-requests-refused',
  templateUrl: './requests-refused.component.html',
  styleUrls: ['./requests-refused.component.css']
})
export class RequestsRefusedComponent  {

  admindata: any;
  
  dataArray: any;
  messageErr: any;
  updaterequests: FormGroup;
  searchedKeyword: any ;
  messageSuccess: any;
  messageError: any;
  submitted: boolean = false;
  p : any = 1 ;
  docDefinition: any ;

  constructor(private demandesServicesService:DemandesServicesService,private router:Router) {

    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    
   
    this.demandesServicesService.getrequestrefusedbyemployee().subscribe(data=>{

      console.log(data) 
      this.dataArray=data 
     , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this demande in our database"} 
    }) 
    
    this.updaterequests = new FormGroup({
      status: new FormControl('', [Validators.required]),
      motif_refused: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
      
    });

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
    status: '',
    start_date: '',
    end_date: '',
    user_id: '',
    reason:'' ,
    motif_refused : ''

  }

  getdata(status: string,  start_date: string, end_date: string, reason: string , motif_refused:any, user_id :any , id: any) {
    this.messageSuccess = ''
    this.dataRequest.status = status
   // this.dataRequest.password = password
    this.dataRequest.start_date = start_date
    this.dataRequest.end_date = end_date
    this.dataRequest.reason = reason
    this.dataRequest.motif_refused = motif_refused
    this.dataRequest.id = id
    this.dataRequest.user_id = user_id

    console.log(this.dataRequest)

  }

  updaterequest(f: any) {
    let data = f.value
    const formData = new FormData();
    formData.append('status', this.updaterequests.value.status);
    // formData.append('password', this.updaterequests.value.password);
   // formData.append('start_date', this.updaterequests.value.start_date);
   // formData.append('end_date', this.updaterequests.value.end_date);

   // formData.append('reason', this.updaterequests.value.reason);
    formData.append('motif_refused', this.updaterequests.value.motif_refused);
    formData.append('user_id', this.updaterequests.value.user_id);

    this.demandesServicesService.updateRequest(this.dataRequest.id, formData).subscribe((response: any) => {

      console.log(response)
     
      Swal.fire('Whooa!', 'Request Succeffully updated !', 'success')
     
      window.location.reload();


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


}
