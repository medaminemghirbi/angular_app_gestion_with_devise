import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import { UsersServicesService } from 'src/app/services/users-services.service';
import Swal from 'sweetalert2';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  dataArray: any;
  
  messageErr: any;

  searchedKeyword: any;

  p: any = 1;

  updateemployees: FormGroup;

  admindata: any;


  constructor(private employeesServicesService: UsersServicesService, private router: Router) {

    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)

    this.employeesServicesService.getAllEmployees().subscribe(data => {
      // debugger
      console.log(data)
      this.dataArray = data
        , (err: HttpErrorResponse) => {
          this.messageErr = "We dont't found this employee in our database"
        }
    })

    this.updateemployees = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    /*
    this.searchemployee = new FormGroup({
      email: new FormControl('', [Validators.required])

    });
    */
  
  }

/*
  searchEmployeeByEmail(f: any) {
    let data = f.value
    const formData = new FormData();
    formData.append('email', this.updateemployees.value.email);


    this.employeesServicesService.searchEmployeeByEmail(formData).subscribe( response => {

      console.log(response)
      this.dataArray = data

    }, (err: HttpErrorResponse) => {
      this.messageErr = "We dont't found this employee in our database"
    })



  }
*/


  delete(id: any, i: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeesServicesService.deleteEmployee(id).subscribe(response => {
          console.log(response)
          this.dataArray.splice(i, 1)


        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload();


      }
    })


  }

  dataEmployee = {
    id: '',
    email: '',
    password: '',
    last_name: '',
    first_name: '',
    address: '',
    phone: '',
    solde: 20,

  }

  getdata(email: string, last_name: string, first_name: string, address: string, phone: any, id: any) {

    this.dataEmployee.email = email

    // this.dataEmployee.password = password
    this.dataEmployee.last_name = last_name
    this.dataEmployee.first_name = first_name
    this.dataEmployee.address = address
    this.dataEmployee.phone = phone

    this.dataEmployee.id = id

    console.log(this.dataEmployee)

  }

  getdata2(email: string, solde: number, id: any) {

    this.dataEmployee.email = email
    this.dataEmployee.solde = solde
    this.dataEmployee.id = id

    console.log(this.dataEmployee)

  }

  updateemployee(f: any) {
    let data = f.value
    const formData = new FormData();
    formData.append('email', this.updateemployees.value.email);
    formData.append('password', this.updateemployees.value.password);
    formData.append('last_name', this.updateemployees.value.last_name);
    formData.append('first_name', this.updateemployees.value.first_name);
    formData.append('address', this.updateemployees.value.address);
    formData.append('phone', this.updateemployees.value.phone);

    this.employeesServicesService.updateEmployee(this.dataEmployee.id, formData).subscribe((response: any) => {

      console.log(response)

      Swal.fire('Whooa !', 'Employee Succeffully updated !', 'success')
      window.location.reload();



    }, (err: HttpErrorResponse) => {
      console.log(err.message)
     
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'champs required or not valid !',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      })
    })



  }



}
