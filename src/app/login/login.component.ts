import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private db: ConnectDBService) { }

  ngOnInit(): void {
    this.buttonValue = 'Submit';
  }

  buttonValue: string = '';

  hash(x: string) {
    let cd = '', salt = '*&$*)@^!%^&%';
    for (let i = 0; i < x.length; i++) {
      cd += (x.charCodeAt(i) * 2.5) + salt[i];
    }
    return cd;
  }

  isUserExisted(data: any) {
    if (data.roll === '') {
      Swal.fire(
			  'Roll Number Field should not be empty',
			  'Enter Proper Roll Number',
			  'warning'
		  );
      return;
    } 
    if (data.pass === '') {
      Swal.fire(
        'Password field should not be empty', 
        'Enter Proper password', 
        'warning'
      );
      return;
    }
    this.buttonValue = 'Submitting ...';
    let query: string = `select name, aadhar, email, count from users where roll = '${data.roll}' and pass = '${data.pass}';`;
    this.db.processQuery(query).subscribe((Data) => {
      if (Data.length != 0 && Data.length != undefined) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('roll', data.roll);
        sessionStorage.setItem('name', Data[0].name);
        sessionStorage.setItem('email', Data[0].email);
        sessionStorage.setItem('key', this.hash(Data[0].aadhar));
        sessionStorage.setItem('count', Data[0].count);
        this.db.processQuery(`update site_data set value = value + 1 where parameter = 'login_count';`).subscribe(_ => {
          this.db.processQuery(`update users set count = count + 1 where roll = '${data.roll}';`).subscribe(__ => {
				    this.router.navigateByUrl('/home');
          });
			  });
      } else {
        Swal.fire(`registration number or password didn't match`, 'please check your credentials', 'error');
        this.buttonValue = 'Submit';
      }
      // console.log(Data);
    });
  }

  forgotPassword = () => this.router.navigateByUrl('/forgotPassword');

}
