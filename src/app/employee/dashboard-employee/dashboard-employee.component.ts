import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent {

  employeedata: any;
  imageupdate: FormGroup;
  image: any;
  upadate: FormGroup;

  constructor(private employeesServicesService: UsersServicesService, private router: Router) {

    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    // console.log(this.employeedata.user.last_name)

    this.imageupdate = new FormGroup({ avatar: new FormControl('', [Validators.required]), });

    this.upadate = new FormGroup({

      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      //  avatar: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });


  }

  fileChange(event: any) {
    this.image = event.target.files[0];
  }

  updateimage(f: any) {
    let data = f.value
    const imageformadata = new FormData();
    imageformadata.append('avatar', this.image);

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.employeesServicesService.updateimageuser(this.employeedata.user.id, imageformadata).subscribe(response => {


          sessionStorage.setItem('employeedata', JSON.stringify(response));
          window.location.reload();


        }, (err: HttpErrorResponse) => {
          console.log(err.message)

        })
        //   this.route.navigate(['/dashbord-freelancer']);
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  updateinfouser(f: any) {
    let data = f.value
    const formData = new FormData();

    formData.append('first_name', this.upadate.value.first_name);
    formData.append('last_name', this.upadate.value.last_name);
    formData.append('email', this.upadate.value.email);
    formData.append('address', this.upadate.value.address);
    formData.append('phone', this.upadate.value.phone);
    formData.append('password', this.upadate.value.password);

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.employeesServicesService.updateinfouser(this.employeedata.id, formData).subscribe(response => {

          sessionStorage.setItem('employeedata', JSON.stringify(response));
          window.location.reload();
       
          console.log(response)
          let indexId = this.employeedata.findIndex((obj: any) => obj.id == this.employeedata.id)

          this.employeedata[indexId].email = data.email
          this.employeedata[indexId].first_name = data.first_name
          this.employeedata[indexId].last_name = data.last_name
          this.employeedata[indexId].address = data.address
          this.employeedata[indexId].phone = data.phone

        }, (err: HttpErrorResponse) => {
          console.log(err.message)

        })
        this.router.navigate(['/dashboard-employee']);
        Swal.fire('Saved !', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved ', '', 'info')
      }
    })

  }


}
