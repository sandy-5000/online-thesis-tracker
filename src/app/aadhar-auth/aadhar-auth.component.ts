import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import { SendMailService } from '../services/sendMail/send-mail.service';
import Swal from 'sweetalert2';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
	selector: 'app-aadhar-auth',
	templateUrl: './aadhar-auth.component.html',
	styleUrls: ['./aadhar-auth.component.css'],
})
export class AadharAuthComponent implements OnInit {
	constructor(
		private router: Router,
		private mail: SendMailService,
		private db: ConnectDBService,
		private shareData: ShareDataService
	) {}
	private OTP: string = '';
	message: string = this.shareData.message;

	hash(x: string) {
		let cd = '', salt = '*&$*)@^!%^&%';
		for (let i = 0; i < x.length; i++) {
			cd += x.charCodeAt(i) * 2.5 + salt[i];
		}
		return cd;
	}

	ngOnInit(): void {
		this.buttonValue = 'Get OTP';
		this.sent = false;
	}
	buttonValue: string = '';
	sent: boolean = false;
	validateAadhar(data: any) {
		if (data.aadhar.length != 12) {
			Swal.fire('Invalid Aadhar number', 'Please verify your aadhar number', 'warning');
			return;
		}
		if (sessionStorage.getItem('key') != this.hash(data.aadhar)) {
			this.router.navigateByUrl('/InvalidUser');
			return;
		}
		this.sendOTP();
		this.sent = true;
		this.router.navigateByUrl('/aadharAuthentication');
	}
	sendOTP() {
		let digits: string = '0123456789',
			otp = '';
		for (let i = 0; i < 6; i++) {
			// otp += digits[Math.floor(Math.random() * 10)];
			otp += 0;
		}
		//console.log(otp);
		this.OTP = otp;
		let body: string = `The OTP for Phd Thesis Tracking System is ${otp} please do not share this with anyone. This is for your information, please do not respond to this mail. It will not be monitored.`;
		this.mail.sendMail(sessionStorage.getItem('email') || '', body);
	}
	validateOTP(data: any) {
		if (this.OTP == data.otp) {
			let query = `select * from status where roll = '${sessionStorage.getItem('roll')}'`;
			this.db.processQuery(query).subscribe((Data) => {
				if (Data.length != 0 && Data.length != undefined) {
        			sessionStorage.setItem('status', JSON.stringify(Data[0]));
					this.router.navigateByUrl('/status');
				} else {
					Swal.fire(
						"registration number or password didn't match",
						'please check your credentials',
						'error'
					);
					window.alert('Your status is not yet updated');
				}
			});
		} else {
			Swal.fire('Invalid OTP', 'Please enter a valid OTP', 'info');
		}
	}
}
