import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RegisterData } from 'src/app/core/api/register/register-data';
import { Register } from 'src/app/core/model/register';
import { ShareService } from 'src/app/share/share.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formValidation!: FormGroup;
  successAlertClosed = false;
  errorAlertClosed = false;

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('errorAlert', { static: false }) errorAlert: NgbAlert;

  constructor(
    private fb: FormBuilder,
    private registerData: RegisterData,
    private router: Router,
    private shareService: ShareService
  ) {}

  get username() {
    return this.formValidation.get('username');
  }

  get password() {
    return this.formValidation.get('password');
  }

  get email() {
    return this.formValidation.get('email');
  }

  ngOnInit(): void {
    this.formValidation = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    });
  }

  register() {
    const item: Register = this.formValidation.value;
    this.registerData.save(item).subscribe({
      next: (res) => {
        console.log(res);
        this.successAlertClosed = true;
        setTimeout(() => this.successAlert.close(), 2000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorAlertClosed = true;
        setTimeout(() => this.errorAlert.close(), 2000);
        // this.errorAlertClosed = false;
      },
    });
  }
}
