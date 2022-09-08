import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import { SendMailService } from '../services/sendMail/send-mail.service';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
	constructor(
		private router: Router,
		private db: ConnectDBService,
		private mail: SendMailService
	) {}

	ngOnInit(): void {}

	roll: string = '';
	email: string = '';
	flag: any = 0;
	OTP: string = '';
	goToLogin = () => this.router.navigateByUrl('/login');

	changeFlag(num: number) {
		this.flag = num;
	}

	isUserExisted(data: any) {
		if (data.email === '') {
			Swal.fire(
				'Enter Proper email',
				'Please re-enter your email',
				'warning'
			);
			return;
		}
		let query = `select * from users where email = '${data.email}' and roll = '${data.roll}'`;
		this.db.processQuery(query).subscribe((dt) => {
			if (dt.length === 0 || dt.length == undefined) {
				window.alert();
				Swal.fire(
					'You are not Registered',
					'Please check your credentials',
					'error'
				);
			} else {
				this.roll = data.roll;
				this.email = data.email;
				this.sendOTP(data.email);
				this.flag = 1;
			}
		});
	}

	updatePassword(data: any) {
		if (data.pass !== data.cpass) {
			Swal.fire("Password didn't match", '', 'warning');
		} else {
			let query = `update users set pass = '${data.pass}' where email = '${this.email}'`;
			this.db.processQuery(query).subscribe((dt) => {
				if (dt.errno == undefined) {
					Swal.fire(
						'Password updated Successfully',
						'Your Password Changed',
						'success'
					);
					this.router.navigateByUrl('/login');
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
			this.flag = 2;
		}
	}

	sendOTP(email: string) {
		let digits: string = '0123456789',
			otp = '';
		for (let i = 0; i < 6; i++) {
			otp += digits[Math.floor(Math.random() * 10)];
			// otp += 0;
		}
		this.OTP = otp;
		let body: string = `The OTP for Phd Thesis Tracking System is ${otp} please do not share this with anyone. This is for your information, please do not respond to this mail. It will not be monitored.`;
		this.mail.sendMail(email, body);
	}
}
