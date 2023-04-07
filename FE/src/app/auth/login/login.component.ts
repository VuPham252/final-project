import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoginData } from 'src/app/core/api/login/login-data';
import { Login } from 'src/app/core/model/login';
import { ShareService } from 'src/app/share/share.service';

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

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('errorAlert', { static: false }) errorAlert: NgbAlert;

  constructor(
    private fb: FormBuilder,
    private loginData: LoginData,
    private router: Router,
    private shareService: ShareService,
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
