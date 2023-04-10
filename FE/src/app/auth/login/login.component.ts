import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoginData } from 'src/app/core/api/login/login-data';
import { Login } from 'src/app/core/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formValidation!: FormGroup;
  isShow: boolean = false;
  successAlertClosed = false;
  errorAlertClosed = false;
  submitted = false;

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('errorAlert', { static: false }) errorAlert: NgbAlert;

  constructor(
    private fb: FormBuilder,
    private loginData: LoginData,
    private router: Router,
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
    this.submitted = true;
    const item: Login = this.formValidation.value;
    this.loginData.login(item).subscribe({
      next: (res) => {
        // debugger;
        localStorage.setItem('token', res.token);
        let tokenData = {};
        let helper = new JwtHelperService();
        tokenData = helper.decodeToken(res.token);
        console.log(tokenData);
        localStorage.setItem('user', helper.decodeToken(res.token).sub);
        this.successAlertClosed = true;
        setTimeout(() => this.successAlert.close(), 2000);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorAlertClosed = true;
        setTimeout(() => this.errorAlert.close(), 2000);
      },
    });
  }

}
