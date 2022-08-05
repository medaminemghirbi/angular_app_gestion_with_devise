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
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeListRequestsComponent } from './employee/employee-list-requests/employee-list-requests.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:token', component: ResetPasswordComponent},

  /************************* ADMIN ******************************/
  { path: 'dashboard-admin' , canActivate:[AuthGuardGuard] ,  component: DashboardAdminComponent },
  { path: 'add-employee',  canActivate:[AuthGuardGuard] , component: AddEmployeeComponent },
  { path: 'list-requests',  canActivate:[AuthGuardGuard] , component: ListDemandesComponent },
  { path: 'list-employees', canActivate:[AuthGuardGuard] ,  component: ListEmployeesComponent },
  

  /************************* EMPLOYEE ******************************/
  { path: 'dashboard-employee', canActivate:[AuthGuardGuard] , component: DashboardEmployeeComponent },
  { path: 'add-request',  canActivate:[AuthGuardGuard] , component: AddDemandeComponent },
  { path: 'employee-list-requests',  canActivate:[AuthGuardGuard] , component: EmployeeListRequestsComponent },
  { path: 'update-profile',  canActivate:[AuthGuardGuard] , component: UpdateProfileComponent },
  { path: 'calendar', canActivate:[AuthGuardGuard] ,  component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
