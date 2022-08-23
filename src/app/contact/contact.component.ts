import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  error: any;

  constructor() {

  }


  public sendEmail(e: Event) {
    e.preventDefault();
 
    emailjs.sendForm('service_1xzx2x3', 'template_v8iv5fs', e.target as HTMLFormElement, 'user_c18mROsP6hhSIlubZqFTI')
      .then((result: EmailJSResponseStatus) => {

        console.log(result.text);
        Swal.fire('Email Succefully Sended !', '', 'success')
        window.location.reload()

      }, (error: { text: any; }) => {

        console.log(error.text);
        Swal.fire('Email Not Sended !', '', 'error')
      });


  }

}
