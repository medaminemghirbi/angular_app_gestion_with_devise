import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  messageError: any
  registerr: any;

  constructor(private usersServicesService: UsersServicesService, private router: Router) {

    this.registerr = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),

    });

   }

  ngOnInit(): void {
  }

  register(f: any) {
    let data = f.value

    const formData = new FormData();
 
    formData.append('email', this.registerr.value.email);
    formData.append('password', this.registerr.value.password);
    formData.append('role', 'employee' );

    if (data.email.length !== 0 || data.password.length !== 0) {
      this.usersServicesService.registerEmployee(formData).subscribe(data => {
        Swal.fire('Whooa !', 'Account succeffully created !', 'success')
        // this.router.navigate(['/login'])
        // this.messageError = "Employee successfully added !"

        console.log(data)
      }, (err: HttpErrorResponse) => {


        console.log(err)
        Swal.fire('Oups !', 'Parameter invalid !', 'error')
        // this.messageError = "Email taken"

      })
    }
    else {
      this.messageError = "Champs rquired"

    }



  }
}
