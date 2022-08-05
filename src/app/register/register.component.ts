import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsersServicesService } from '../services/users-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  messageError: any

  constructor(private usersServicesService: UsersServicesService, private router: Router) { }


  user: User = {
    email: '',
    password: '',
  }

  register() {

    const data = {
      user:
      {
        email: this.user.email,
        password: this.user.password,
      }

    };

    this.usersServicesService.registerAdmin(data).subscribe(
      response => {

        console.log(response);

        if (response.status == 401) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentials'
          })
        } else {


          if (response.status == 200) {

            console.log(response);
            this.router.navigate(['/']);
          }


          else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account created but not confirmed ! , Check Your Email'
            })
          }

        }

      }, (err: HttpErrorResponse) => this.messageError = err.error.error);

  }










  /*
    register(f: any) {
      let data = f.value
      console.log(data)
  
  
        this.usersServicesService.register(data).subscribe(data => {
          const obj = JSON.parse(data);
  
         // JSON.parse(JSON.stringify(data))
         // console.log(JSON.parse(JSON.stringify(data)) )
  
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Account created , Activate Email to acced account profil !',
            showConfirmButton: false,
            timer: 1500
          })
          // this.router.navigate(['/login'])
  
          console.log(obj)
        }, (err: HttpErrorResponse) => {
  
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Parameter invalid !',
            showConfirmButton: false,
            timer: 1500
          })
  
          console.log(err)
  
          // this.messageError = "Email taken"
  
        })
     
  
  
  
    }
  */

}
