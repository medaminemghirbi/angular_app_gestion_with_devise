import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsersServicesService } from '../services/users-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  messageError: any

  user: User = {
    email: '',
    password: '',
  }

  constructor(private usersServicesService: UsersServicesService, private route: Router) { 
    sessionStorage.clear() 
  }


  login() {

    const data = {
      user:
      {
        email: this.user.email,
        password: this.user.password,
      }

    };

    this.usersServicesService.login(data).subscribe(
      response => {
     
        if (response.status == 401) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        } else {


          if (response.user.email_confirmed == true) {
            if (response.role == "admin") {

              sessionStorage.setItem('admindata', JSON.stringify(response));
              console.log(response);
              this.route.navigate(['/dashboard-admin']);

            }
            else if (response.role == "employee") {

              sessionStorage.setItem('employeedata', JSON.stringify(response));
              console.log(response);
              this.route.navigate(['/dashboard-employee']);

            }
            else {

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email or Password is Incorrect!'
              })

            }
          } else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account created but not confirmed ! , Check Your Email !'
            })

          }

        }

      }, (err: HttpErrorResponse) => this.messageError = err.error.error  );

  }
















  login2() {

    const data = {
      user:
      {
        email: this.user.email,
        password: this.user.password,
      }

    };

    this.usersServicesService.login(data).subscribe(
      response => {

        //   sessionStorage.setItem('admindata', JSON.stringify(response));

        console.log(JSON.parse(response).toString(response));
        console.log(JSON.parse(JSON.stringify(response)));

        if (response.status == 401) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        } else {


          if (response.status == 200 && response.role == "admin") {
            // if (response.role == 0 )
            sessionStorage.setItem('admindata', JSON.stringify(response));

            console.log(response);
            this.route.navigate(['/dashboard-admin']);
          }
          else if (response.status == 200 && response.role == "employee") {
            sessionStorage.setItem('employeedata', JSON.stringify(response));

            console.log(response);
            this.route.navigate(['/dashboard-employee']);
          }


          else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Account created but not confirmed ! , check Your Email'
            })
          }

        }

      }, (err: HttpErrorResponse) => this.messageError = err.error.error);

  }



}
