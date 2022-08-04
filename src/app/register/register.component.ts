import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersServicesService } from '../services/users-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageError: any

  constructor(private usersServicesService: UsersServicesService, private router: Router) { }

  ngOnInit(): void {
  }

  register(f: any) {
    let data = f.value
    console.log(data)
    if (data.email.length !== 0 || data.password.length !== 0) {
      this.usersServicesService.register(data).subscribe(data => {
        Swal.fire('Whooa !', 'Account succeffully created , Acctivate Email to acced account profil !', 'success')
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
