import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataArray: any = [];
  dataArrayy: any = [];
  messageErr = ''
  logged_in: boolean = false;
  role: string = '';
  admindata: any;
  clientdata: any;
  freelancerdata: any;

  constructor(public userService: UsersService) {

    this.admindata = JSON.parse(sessionStorage.getItem('admindata') || '{}');
    this.clientdata = JSON.parse(sessionStorage.getItem('clientdata') || '{}');
    this.freelancerdata = JSON.parse(sessionStorage.getItem('freelancerdata') || '{}');
    this.logged_in = JSON.parse(sessionStorage.getItem('logged_in')!);
    console.log(this.logged_in)

    this.role = JSON.parse(sessionStorage.getItem('role')!);
    console.log(this.role)

  }

  ngOnInit(): void {
    this.userService.getAllcategories().subscribe(data => {
      this.connecter();
      console.log(data)
      this.dataArray = data, (err: HttpErrorResponse) => {
        console.log(err)
        this.messageErr = "We dont't found this user in our database"
      }
      //console.log(this.dataArray)
    })

    this.userService.countAllHome().subscribe(data => {
      this.connecter();
      console.log(data)
      this.dataArrayy = data, (err: HttpErrorResponse) => {
        console.log(err)
        this.messageErr = "We dont't found this user in our database"
      }
      //console.log(this.dataArray)
    })

  }
  connecter() {
    if (this.userService.connecte == true)
      this.logged_in = true
  }
}
