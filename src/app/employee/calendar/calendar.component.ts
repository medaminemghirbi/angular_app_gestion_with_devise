import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DemandesServicesService } from 'src/app/services/demandes-services.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  employeedata: any;

  messageErr: any;

  events: any[] = []

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false,

  };


  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }


  constructor(private demandesServicesService: DemandesServicesService) {

    this.employeedata = JSON.parse(sessionStorage.getItem('employeedata')!);

    this.demandesServicesService.getRequestsByIDAccepted(this.employeedata.id).subscribe(data => {
      // console.log(data)


      data.requests.forEach((l: { [x: string]: string; }) =>

        this.events.push({

          title: l["reason"], date: l["start_date"]




        })
      );

      console.log(this.events)

    })

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.events,
      };
    }, 5);


  }



}
