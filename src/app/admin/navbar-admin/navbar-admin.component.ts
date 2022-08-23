import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent  {
  
  admindata: any;

  constructor( private usersServicesService: UsersServicesService , private router: Router  ) { 
    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    
   }




  logout(){
  
    this.usersServicesService.logout();
    console.log("log out" )
    sessionStorage.clear() 
    this.router.navigate(['/']);
   
  }

}
