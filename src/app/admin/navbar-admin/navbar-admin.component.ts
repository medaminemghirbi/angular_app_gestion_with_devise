import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  
  admindata: any;

  constructor() {
    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    
   }

  ngOnInit(): void {
  }

}
