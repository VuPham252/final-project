import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/core/api/register/register-data';
import { Register } from 'src/app/core/model/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formValidation!: FormGroup;
  successAlertClosed = false;
  errorAlertClosed = false;

  constructor(
    private fb: FormBuilder,
    private registerData: RegisterData,
    private router: Router,
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
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorAlertClosed = true;
        // this.errorAlertClosed = false;
      },
    });
  }
}
