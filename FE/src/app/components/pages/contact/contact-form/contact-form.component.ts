import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactData } from 'src/app/core/api/contact/contact-data';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private contactData: ContactData) { }
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.contactForm.value);
    this.contactForm.reset();
  }

  ngOnInit(): void {

  }

  submit() {
    const item = this.contactForm.value;
    this.contactData.post(item).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
