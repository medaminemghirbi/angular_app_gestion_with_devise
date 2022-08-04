import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListDemandesComponent } from './admin/list-demandes/list-demandes.component';
import { ListEmployeesComponent } from './admin/list-employees/list-employees.component';
import { AddDemandeComponent } from './employee/add-demande/add-demande.component';
import { CalendarComponent } from './employee/calendar/calendar.component';
import { DashboardEmployeeComponent } from './employee/dashboard-employee/dashboard-employee.component';
import { UpdateProfileComponent } from './employee/update-profile/update-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /************************* ADMIN ******************************/
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'list-demandes', component: ListDemandesComponent },
  { path: 'list-employees', component: ListEmployeesComponent },
  

  /************************* EMPLOYEE ******************************/
  { path: 'dashboard-employee', component: DashboardEmployeeComponent },
  { path: 'add-demande', component: AddDemandeComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'calendar', component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
