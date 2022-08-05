import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.css']
})
export class ListDemandesComponent implements OnInit {

  dataArray : any ;
  messageErr : any ;
  searchedKeyword : any ;
  p : any ;
  messageSuccess: any ;
  updateemployees: any;
  usersService: any;
  submitted: boolean = false ;
  route: any;
  messageError: any;
  updatedemandes: FormGroup;
  admindata: any;

  constructor(private demandesServicesService:DemandesServicesService,private router:Router) {

    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    
    this.demandesServicesService.getAllDemandes().subscribe(data=>{
      // debugger
      console.log(data) 
      this.dataArray=data 
     , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this demande in our database"} 
    }) 
    
    this.updatedemandes = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),

    });

  }

  ngOnInit(): void {
    this.demandesServicesService.getAllDemandes().subscribe(data=>{
      // debugger
      console.log(data) 
      this.dataArray=data 
     , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this demande in our database"} 
    }) 
 
  }

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
        this.demandesServicesService.deleteDemande(id).subscribe(response => {
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

  dataDemande = {
    id: '',
    status: '',
    start_date: '',
    end_date: '',
    user_id: '',
    motif : ''

  }

  getdata(status: string,  start_date: string, end_date: string, motif: string, user_id :any , id: any) {
    this.messageSuccess = ''
    this.dataDemande.status = status
   // this.dataDemande.password = password
    this.dataDemande.start_date = start_date
    this.dataDemande.end_date = end_date
    this.dataDemande.motif = motif
    this.dataDemande.id = id
    this.dataDemande.user_id = user_id

    console.log(this.dataDemande)

  }

  updatedemande(f: any) {
    let data = f.value
    const formData = new FormData();
    formData.append('status', this.updateemployees.value.status);
    // formData.append('password', this.updateemployees.value.password);
    formData.append('start_date', this.updateemployees.value.start_date);
    formData.append('end_date', this.updateemployees.value.end_date);
    formData.append('motif', this.updateemployees.value.motif);
    formData.append('user_id', this.updateemployees.value.user_id);

    this.usersService.updateEmployee(this.dataDemande.id, formData).subscribe((response: any) => {


      console.log(response)
      this.submitted = true;
      let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataDemande.id)

      this.dataArray[indexId].id = data.id
      this.dataArray[indexId].status = data.status
      //  this.dataArray[indexId].password = data.password
      this.dataArray[indexId].start_date = data.start_date
      this.dataArray[indexId].end_date = data.end_date
      this.dataArray[indexId].motif = data.motif
      this.dataArray[indexId].user_id = data.user_id

      this.messageSuccess = `this title : ${this.dataArray[indexId].email} is updated`
      Swal.fire('Whooa!', 'Employee Succeffully updated !', 'success')
      //window.location.reload();
      this.route.navigate(['/list-employees']);


    }, (err: HttpErrorResponse) => {
      console.log(err.message)
      this.messageError = "champs required or not valid !"
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
