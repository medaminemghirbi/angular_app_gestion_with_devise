import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersServicesService } from '../services/users-services.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpassword!: FormGroup;
  messageSuccess = '';
  messageErr = ''
  constructor(private usersServicesService: UsersServicesService, public activatedRoute: ActivatedRoute, private route: Router) {
    this.resetpassword = new FormGroup({
      password: new FormControl('', [Validators.required])

    });
  }

  ngOnInit(): void {
  }
  updatepassword(f: any) {

    const formData = new FormData();
    formData.append('password', this.resetpassword.value.password);
    let data = f.value


    this.usersServicesService.resetPassword(this.activatedRoute.snapshot.params['token'], formData).subscribe(() => {
      console.log(formData)

      // console.log(formData)


    }, (err: HttpErrorResponse) => {
      this.messageErr = err.error
      console.log(err.error)
      console.log(err.status)

    });
    Swal.fire('Password Updated Avec Succes !', '', 'success')
    this.route.navigate(['/']);
  }
}
