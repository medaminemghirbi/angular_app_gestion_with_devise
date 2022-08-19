import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent {

  admindata: any;
  imageupdate: FormGroup;
  image: any;
  upadate: FormGroup;

  constructor(private usersServicesService: UsersServicesService, private router: Router) {

    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    // console.log(this.admindata.user.last_name)

    this.imageupdate = new FormGroup({ avatar: new FormControl('', [Validators.required]), });

    this.upadate = new FormGroup({

      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

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
      if (result.isConfirmed) {

        this.usersServicesService.updateimageuser(this.admindata.user.id, imageformadata).subscribe(response => {


          sessionStorage.setItem('admindata', JSON.stringify(response));
          window.location.reload();


        }, (err: HttpErrorResponse) => {
          console.log(err.message)

        })

        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }



  updateinfouser(f: any) {
    let data = f.value
    const formData = new FormData();
    //formData.append('avatar', this.image );
    formData.append('first_name', this.upadate.value.first_name);
    formData.append('last_name', this.upadate.value.last_name);
    formData.append('email', this.upadate.value.email);
    formData.append('address', this.upadate.value.address);
    formData.append('phone', this.upadate.value.phone);
    formData.append('password', this.upadate.value.password);

    // formData.append('password_confirmation', this.upadate.value.password_confirmation);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersServicesService.updateinfouser(this.admindata.id, formData).subscribe(response => {

          sessionStorage.setItem('admindata', JSON.stringify(response));
          window.location.reload();
          //  this.router.navigate(['/dashboard-employee'])

          console.log(response)
          let indexId = this.admindata.findIndex((obj: any) => obj.id == this.admindata.id)

          this.admindata[indexId].email = data.email
          this.admindata[indexId].first_name = data.first_name
          this.admindata[indexId].last_name = data.last_name
          this.admindata[indexId].address = data.address
          this.admindata[indexId].phone = data.phone

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
