import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  flag: boolean = false;
  _flag: boolean = false;
  userId: any = '';
  ngOnInit(): void { 
    this.reload();
  }
  reload() {
    this._flag = !!sessionStorage.getItem('AdminLoggedIn');
    this.flag = !!sessionStorage.getItem('isLoggedIn') || this._flag;
    this.userId = this.flag ? sessionStorage.getItem('name') : '';
  }
  goToLogin = () => this.router.navigateByUrl('/login');
  goToRegister = () => this.router.navigateByUrl('/register');
  goToAdmin = () => this.router.navigateByUrl('/Admin');
  goToHome = () => this.router.navigateByUrl('/home');
  goToUpdate = () => this.router.navigateByUrl('/update');
  logout = () => {
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
    this.reload();
  };

}
