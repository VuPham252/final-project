import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/api/login/login-data';
import { Login } from 'src/app/core/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formValidation!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginData: LoginData,
    private router: Router
  ) {}

  get username() {
    return this.formValidation.get('username');
  }

  get password() {
    return this.formValidation.get('password');
  }

  ngOnInit(): void {
    this.formValidation = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const item: Login = this.formValidation.value;
    this.loginData.login(item).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
