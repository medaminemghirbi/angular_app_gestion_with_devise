import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  error: any;
  //sendemail: any ;

  constructor() {

    /* this.sendemail = new FormGroup({
       name: new FormControl('', [Validators.required]),
       email: new FormControl('', [Validators.required]),
       message: new FormControl('', [Validators.required]),
     });
     */
  }


  public sendEmail(e: Event) {
    e.preventDefault();
    /* const formData = new FormData();
      formData.append('name', this.sendemail.value.name);
      formData.append('email', this.sendemail.value.email);
      formData.append('message', this.sendemail.value.message);
    */
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
