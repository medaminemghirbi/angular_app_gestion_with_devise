import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsersServicesService } from '../services/users-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public connecte: boolean = false;

  messageError: any

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  user: User = {
    email: '',
    password: '',
  }

  constructor(private usersServicesService: UsersServicesService, private route: Router) { }

  ngOnInit(): void {
  }

  login() {

    const data = {
      email: this.user.email,
      password: this.user.password,

    };

    this.usersServicesService.login(data).subscribe(
      response => {
        console.log(response);
        if (response.status == 401) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        } else {


          if (response.status == 200) {
            // if (response.role == 0 )
            
            console.log(response);
            this.route.navigate(['/dashboard-admin']);
          }

        
       else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Account created but not confirmed ! , check Your Email'
          })
        }

      }
     
      },(err: HttpErrorResponse) => this.messageError = err.error.error);
      
  }


}
