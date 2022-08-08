import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  employeedata: any;

  constructor( private usersServicesService: UsersServicesService , private router: Router  ) { 
    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata.id)
    
  }

  ngOnInit(): void {
  }

  logout(){
  
    this.usersServicesService.logout();
    sessionStorage.clear() 
    this.router.navigate(['/']);
   
  }

}
