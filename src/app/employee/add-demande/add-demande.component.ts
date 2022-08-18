import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import * as moment from 'moment';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent {
  messageError: any;
  messageErr: any;
  dataArray: any;
  employeedata: any;
  addrequestt: FormGroup;
  date: any;

  constructor(private demandesServicesService: DemandesServicesService, private router: Router) {
    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata);

    this.addrequestt = new FormGroup({
      status: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
   //   motif_refused: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required])

    });

  }

  addRequestt(f: any) {
    const formData = new FormData();

    formData.append('start_date', this.addrequestt.value.start_date);
    formData.append('end_date', this.addrequestt.value.end_date);
    formData.append('reason', this.addrequestt.value.reason);
    formData.append('description', this.addrequestt.value.description);
  //  formData.append('motif_refused', '');
    formData.append('user_id', this.employeedata.id);

    let data = f.value

    console.log(data)

    this.date = moment(Date.now()).format("YYYY-MM-DD");
    if (data.start_date > this.date) {

      if (data.start_date <= data.end_date) {

        this.demandesServicesService.addRequest(formData).subscribe(() => {

          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Saved !',

            showConfirmButton: true,
            timer: 1500
          })
          // window.location.reload();
          this.router.navigate(['/employee-list-requests'])


        }, (err: HttpErrorResponse) => {

          this.messageError = "champs required or not valid"

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'champs required or not valid !',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          })
        });


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



}
