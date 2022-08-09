import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ListDemandesComponent } from './admin/list-demandes/list-demandes.component';
import { DashboardEmployeeComponent } from './employee/dashboard-employee/dashboard-employee.component';
import { AddDemandeComponent } from './employee/add-demande/add-demande.component';
import { UpdateProfileComponent } from './employee/update-profile/update-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListEmployeesComponent } from './admin/list-employees/list-employees.component';

import { ButtonsModule, CardsModule, ChartsModule, MDBBootstrapModule, TableModule } from 'angular-bootstrap-md';
import { CalendarComponent } from './employee/calendar/calendar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarComponent } from './employee/sidebar/sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeListRequestsComponent } from './employee/employee-list-requests/employee-list-requests.component';
import { RequestsAcceptedComponent } from './admin/requests-accepted/requests-accepted.component';
import { RequestsInprogressComponent } from './admin/requests-inprogress/requests-inprogress.component';
import { RequestsRefusedComponent } from './admin/requests-refused/requests-refused.component';
import { GenerateRequestComponent } from './employee/generate-request/generate-request.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    AddEmployeeComponent,
    ListDemandesComponent,
    DashboardEmployeeComponent,
    AddDemandeComponent,
    UpdateProfileComponent,
    LoginComponent,
    RegisterComponent,
    ListEmployeesComponent,
    CalendarComponent,
    ResetPasswordComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    EmployeeListRequestsComponent,
    RequestsAcceptedComponent,
    RequestsInprogressComponent,
    RequestsRefusedComponent,
    GenerateRequestComponent,
    ContactComponent,
    TestComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule,

    ChartsModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
