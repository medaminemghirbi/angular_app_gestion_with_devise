import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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

  constructor(private usersServicesService: UsersServicesService, private router: Router) {
    sessionStorage.clear()
  }


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
              text: 'Account created !! '
            })
          }

        }

      }, (err: HttpErrorResponse) => this.messageError = err.error.error );

  }


}
