import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent  {
  admindata: any;

  constructor( private usersServicesService: UsersServicesService , private router: Router  ) { 
    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    
  }

  logout(){
  
    this.usersServicesService.logout();
    sessionStorage.clear() 
    this.router.navigate(['/']);
   
  }


}
