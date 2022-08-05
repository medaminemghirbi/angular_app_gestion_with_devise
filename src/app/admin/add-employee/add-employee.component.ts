import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private usersServicesService: UsersServicesService, private router: Router) { }

  ngOnInit(): void {
  }

  register(f: any) {
    let data = f.value
    console.log(data)
    if (data.email.length !== 0 || data.password.length !== 0) {
      this.usersServicesService.registerEmployee(data).subscribe(data => {
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
