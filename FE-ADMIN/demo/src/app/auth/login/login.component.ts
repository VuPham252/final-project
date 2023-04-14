import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginData } from 'src/app/core/api/login/login-data';
import { Login } from 'src/app/core/model/login';
import { AlertService } from 'src/app/_services/alert.service';

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

  constructor(
    private fb: FormBuilder,
    private loginData: LoginData,
    private router: Router,
    private alertService: AlertService,
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
        this.alertService.success("Login success");
        this.successAlertClosed = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.alertService.error("Login fail")
        this.errorAlertClosed = true;
      },
    });
  }

}
