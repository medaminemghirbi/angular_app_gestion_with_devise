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
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.css']
})
export class ListDemandesComponent {

  dataArray: any;
  messageErr: any;
  searchedKeyword: any;
  p: any = 1;

  updaterequests: FormGroup;

  requestdetails: any;


  constructor(private demandesServicesService: DemandesServicesService, private router: Router) {

    this.demandesServicesService.getAllRequests().subscribe(data => {

      console.log(data)
      this.dataArray = data

      sessionStorage.setItem('requestdetails', JSON.stringify(data)), (err: HttpErrorResponse) => {
        this.messageErr = "We dont't found this request in our database"
      }
    })

    this.requestdetails = JSON.parse(sessionStorage.getItem('requestdetails')!);

    
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
    motif_refused: '',
    user_id: '',
    created_at: '',
    reason: '',
    description: ''
  }

  getdata1(status: string, motif_refused: any, user_id: any, created_at: any, reason: any, description: any, id: any) {

    this.dataRequest.status = status
    this.dataRequest.user_id = user_id

    this.dataRequest.description = description
    this.dataRequest.motif_refused = motif_refused
    this.dataRequest.created_at = created_at
    this.dataRequest.reason = reason
    this.dataRequest.id = id


    console.log(this.dataRequest)

  }

  getdata(status: string, motif_refused: any, user_id: any, id: any) {

    this.dataRequest.status = status
    this.dataRequest.user_id = user_id

    this.dataRequest.motif_refused = motif_refused
    this.dataRequest.id = id


    console.log(this.dataRequest)

  }

  updaterequest(f: any) {

    let data = f.value
    const formData = new FormData();
    formData.append('status', this.updaterequests.value.status);
    formData.append('motif_refused', this.updaterequests.value.motif_refused);
    formData.append('user_id', this.updaterequests.value.user_id);

    this.demandesServicesService.updateRequest(this.dataRequest.id, data).subscribe((response: any) => {

      console.log(response)

      Swal.fire('Whooa!', 'Request Succeffully updated !', 'success')

      window.location.reload();


    }, (err: HttpErrorResponse) => {
      console.log(err.message)

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
