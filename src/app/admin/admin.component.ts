import { Component, OnInit } from '@angular/core';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SendMailService } from '../services/sendMail/send-mail.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	constructor(
		private db: ConnectDBService,
		private router: Router,
		private mail: SendMailService
	) {}

	loggedIn: boolean = false;

	ngOnInit(): void {
		this._reset = false;
		this._fpass = false;
		this._validateOTP = false;
		this.loggedIn = !!sessionStorage.getItem('AdminLoggedIn');
		if (this.loggedIn) this.router.navigateByUrl('/admin_portal');
	}

	adminLogin(user: any) {
		if (user.admin === '') {
			Swal.fire(
				'Invalid admin ID',
				'Please enter a proper admin ID',
				'warning'
			);
			return;
		}
		if (user.pass === '') {
			Swal.fire(
				'Invalid Password',
				'Please enter a proper Password',
				'warning'
			);
			return;
		}
		let query: string = `select * from admins where adminId = '${user.admin}' and password = '${user.pass}'`;
		this.db.processQuery(query).subscribe((Data) => {
			if (Data.length != 0 && Data.length != undefined) {
				if (this._reset) {
					this.reset(user);
					return;
				}
				sessionStorage.setItem('AdminLoggedIn', 'true');
				sessionStorage.setItem('name', user.admin);
				this.router.navigateByUrl('/admin_portal');
			} else {
				Swal.fire(
					`registration number or password didn't match`,
					'please check your credentials',
					'error'
				);
			}
		});
	}

	_reset: boolean = false;
	ResetPassword = () => (this._reset = true);
	reset(user: any) {
		let query: string = `update admins set password = '${user.npass}' where adminId = '${user.admin}'`;
		this.db.processQuery(query).subscribe((dt) => {
			if (dt.error != undefined) {
				Swal.fire('Admin password updation failed', '', 'error');
			} else {
				Swal.fire('Admin password updated', '', 'success');
				this._reset = false;
			}
		});
	}

	_fpass: boolean = false;
	_validateOTP: boolean = false;
	OTP: string = '';

	ForgetPassword = () => {
		this.sendOTP('jntukphdthesistracking2022@gmail.com');
		this._fpass = true;
	};

	updatePassword(data: any) {
		if (data.pass !== data.cpass) {
			Swal.fire("Password didn't match", '', 'warning');
		} else {
			let query = `update admins set password = '${data.pass}' where adminId = 'Admin'`;
			this.db.processQuery(query).subscribe((dt) => {
				if (dt.errno == undefined) {
					Swal.fire(
						'Password updated Successfully',
						'Your Password Changed',
						'success'
					);
					sessionStorage.clear();
					this._fpass = this._reset = this._validateOTP = this.loggedIn = false;
				} else {
					Swal.fire(
						'Password updated Unsuccessfully',
						'Error in connection',
						'error'
					);
				}
			});
		}
	}

	validateOTP(data: any) {
		if (data.otp !== this.OTP) {
			Swal.fire('Invalid OTP', 'Please enter a valid OTP', 'info');
		} else {
			this._fpass = false;
			this._validateOTP = true;
		}
	}

	sendOTP(email: string) {
		let digits: string = '0123456789',
			otp = '';
		for (let i = 0; i < 6; i++) {
			otp += digits[Math.floor(Math.random() * 10)];
			//otp += i + 1;
		}
		this.OTP = otp;
		let body: string = `The OTP for Phd Thesis Tracking System is ${otp} please do not share this with anyone. This is for your information, please do not respond to this mail. It will not be monitored.`;
		this.mail.sendMail(email, body);
	}
}
