import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
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


  constructor(private demandesServicesService: DemandesServicesService, private router: Router) {
    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata);

    this.addrequestt = new FormGroup({
      status: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      motif_accepted: new FormControl('', [Validators.required]),
      motif_refused: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required])

    });

  }

  addRequestt(f: any) {
    const formData = new FormData();
    formData.append('status', 'in_progress' );
    formData.append('start_date', this.addrequestt.value.start_date);
    formData.append('end_date', this.addrequestt.value.end_date);
    formData.append('motif_accepted', this.addrequestt.value.motif_accepted);
    formData.append('motif_refused', '');
    formData.append('user_id', this.employeedata.user.id);

    let data = f.value

    console.log(data)
    this.demandesServicesService.addRequest(formData).subscribe(() => {

      Swal.fire({
        icon: 'success',
        title: 'success...',
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



}
