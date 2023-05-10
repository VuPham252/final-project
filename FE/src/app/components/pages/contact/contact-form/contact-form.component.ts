import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactData } from 'src/app/core/api/contact/contact-data';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('errorAlert', { static: false }) errorAlert: NgbAlert;

  public successAlertClosed = false;
  public errorAlertClosed = false;

  constructor(private contactData: ContactData, private modalService: NgbModal,) { }
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [])
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.contactForm.value);
    this.contactForm.reset();
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  ngOnInit(): void {

  }

  submit() {
    const item = this.contactForm.value;
    this.contactData.post(item).subscribe({
      next: (res) => {
        console.log(res);
        this.contactForm.reset();
        this.modalService.dismissAll();
        this.successAlertClosed = true;
        setTimeout(() => this.successAlert.close(), 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorAlertClosed = true;
        setTimeout(() => this.errorAlert.close(), 2000);
      }
    })
  }

}
