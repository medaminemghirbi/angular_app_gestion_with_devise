import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListDemandesComponent } from './admin/list-demandes/list-demandes.component';
import { ListEmployeesComponent } from './admin/list-employees/list-employees.component';
import { AddDemandeComponent } from './employee/add-demande/add-demande.component';
import { CalendarComponent } from './employee/calendar/calendar.component';
import { DashboardEmployeeComponent } from './employee/dashboard-employee/dashboard-employee.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeListRequestsComponent } from './employee/employee-list-requests/employee-list-requests.component';
import { RequestsAcceptedComponent } from './admin/requests-accepted/requests-accepted.component';
import { RequestsInprogressComponent } from './admin/requests-inprogress/requests-inprogress.component';
import { RequestsRefusedComponent } from './admin/requests-refused/requests-refused.component';
import { GenerateRequestComponent } from './employee/generate-request/generate-request.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'contact', component: ContactComponent },

  //  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password/:token', component: ResetPasswordComponent },

  { path: 'test', component: TestComponent },


  /************************* ADMIN ******************************/
  { path: 'dashboard-admin', canActivate: [AuthGuardGuard], component: DashboardAdminComponent },
  { path: 'add-employee', canActivate: [AuthGuardGuard], component: AddEmployeeComponent },
  { path: 'list-requests', canActivate: [AuthGuardGuard], component: ListDemandesComponent },
  { path: 'list-employees', canActivate: [AuthGuardGuard], component: ListEmployeesComponent },
  { path: 'requests-accepted', canActivate: [AuthGuardGuard], component: RequestsAcceptedComponent },
  { path: 'requests-inprogress', canActivate: [AuthGuardGuard], component: RequestsInprogressComponent },
  { path: 'requests-refused', canActivate: [AuthGuardGuard], component: RequestsRefusedComponent },
  { path: 'generaterequestemployee/:id', canActivate: [AuthGuardGuard], component: GenerateRequestComponent },
  { path: 'profile-admin', canActivate: [AuthGuardGuard], component: ProfileAdminComponent },

  /************************* EMPLOYEE ******************************/
  { path: 'dashboard-employee', canActivate: [AuthGuardGuard], component: DashboardEmployeeComponent },
  { path: 'add-request', canActivate: [AuthGuardGuard], component: AddDemandeComponent },
  { path: 'employee-list-requests', canActivate: [AuthGuardGuard], component: EmployeeListRequestsComponent },
  { path: 'calendar', canActivate: [AuthGuardGuard], component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
