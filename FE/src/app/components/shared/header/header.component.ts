import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends HelperService implements OnInit {
  public getUser: boolean = false;
  public userName: string = '';

  constructor(private router: Router,) {
    super();
  }

  ngOnInit(): void {
    this.User();
  }

  public User() {
    let getLocalUser = localStorage.getItem('user');
    if (getLocalUser) {
      this.userName = getLocalUser;
      this.getUser = true;
    }
  }

  public signOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
