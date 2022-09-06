import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	constructor(private db: ConnectDBService, private router: Router) {}

	ngOnInit(): void {}

	validate(data: any) {
		let keys: string[] = [
			'roll',
			'name',
			'email',
			'pass',
			'phone',
			'aadhar',
			'Sname',
			'Semail',
			'Sphone',
			'DateOfSub',
		];
		let mapped: string[] = [
			'Roll Number',
			'Name',
			'Email',
			'Password',
			'Phone Number',
			'Aadhar Number',
			'Supervisor Name',
			'Supervisor Email',
			'Supervisor Phone Number',
			'Date Of Submission',
		];
		for (const [index, value] of keys.entries()) {
			if (!data[value])
				return `${mapped[index]} field can't be left empty`;
		}
		if (data.pass != data.cpass) return `Password didn't match`;
		if (data.phone.length != 10) return `Invalid Phone Number`;
		if (data.Sphone.length != 10) return `Invalid Supervisor Phone Number`;
		if (data.aadhar.length != 12) return `Invalid Aadhar Number`;
		let count: number = 0;
		for (const key of ['Cname', 'Cphone', 'Cemail']) {
			data[key] != '' && ++count;
		}
		if (count === 3 && data.Cphone.length != 10)
			return `Invalid Co-Supervisor Phone Number`;
		return count === 3 || count === 0
			? 'ok'
			: `Enter (none or all) fields of Co-Supervisor`;
	}

	insert(data: any) {
		let query = 'insert into users set ';
		for (const [key, value] of Object.entries(data)) {
			if (key === 'cpass') continue;
			query += `${key} = '${value}', `;
		}
		query = query.slice(0, -2) + ';';
		this.db.processQuery(query).subscribe((data) => {
			if (data.errno != undefined) {
				Swal.fire(
					'User Registration failed!',
					'Connection with database failed or inconsistant Data',
					'error'
				);
			} else {
				Swal.fire(
					'User successfully registered!',
					'you can now login to our site',
					'success'
				);
				this.router.navigateByUrl('/login');
			}
		});
	}

	getMail(data: any) {
    let roll: string = data.roll;
		let query = `select email from user_mails where roll = '${roll}';`;
		this.db.processQuery(query).subscribe(dt => {
			if (dt.errno != undefined) {
				Swal.fire(
					'User Registration failed!',
					'Connection with database failed or inconsistant Data',
					'error'
				);
			} else if (dt.length === 0 || data.email != dt[0].email) {
				Swal.fire(
					'You are not a Valid user',
					'User Registration failed!',
					'error'
				);
			} else {
        this.insert(data);
      }
		});
	}

	register(data: any) {
		for (const key in data) data[key] = data[key].trim();
		let reply = this.validate(data);
		if (reply !== 'ok') {
			Swal.fire(reply, 'Please Enter Proper value', 'warning');
			return;
		}
		this.getMail(data);
	}
}
