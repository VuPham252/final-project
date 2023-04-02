import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/core/api/register/register-data';
import { Register } from 'src/app/core/model/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formValidation!: FormGroup;

  constructor(private fb: FormBuilder, private registerData: RegisterData, private router: Router) { }

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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  register() {
    const item: Register = this.formValidation.value;
    this.registerData.save(item).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.router.navigate(['login']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
