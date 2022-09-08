import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import { SendMailService } from '../services/sendMail/send-mail.service';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
	selector: 'app-update-data',
	templateUrl: './update-data.component.html',
	styleUrls: ['./update-data.component.css'],
})
export class UpdateDataComponent implements OnInit {
	constructor(
		private db: ConnectDBService,
		private router: Router,
		private mail: SendMailService,
		private shareData: ShareDataService
	) { }

	message: string = this.shareData.message;

	ngOnInit(): void {
		this.flag_ = false;
		if (!sessionStorage.getItem('isLoggedIn')) {
			this.router.navigateByUrl('/login');
		}
	}

	validate(data: any) {
		let [key, type] = data.key.split(':');
		data.key = key;
		if (type == 1 && data.value === '') {
			return `Field can't be left empty`;
		}
		if (type == 2 && data.value.length != 12) {
			return `Invalid Aadhar Number`;
		}
		if (type == 3 && data.value.length != 10) {
			return `Invalid Phone Number`;
		}
		return 'ok';
	}

	updateField(data: any) {
		let roll = sessionStorage.getItem('roll');
		let query: string = `update users set ${data.key} = '${data.value}' where roll = '${roll}'`;
		this.db.processQuery(query).subscribe((dt) => {
			if (dt.errno != undefined) {
				Swal.fire(
					'Field not Updated',
					'Problem in connecting database',
					'error'
				);
			} else {
				Swal.fire('Field Updated Successfully', '', 'success');
				this.router.navigateByUrl('/home');
			}
		});
	}

	update(data: any) {
		data.key = data.key.trim();
		data.value = data.value.trim();
		let reply = this.validate(data);
		if (reply != 'ok') {
			Swal.fire(reply, 'Enter Proper value', 'warning');
		}
		this.updateField(data);
	}

	OTP: string = '';
	flag_: boolean = false;
	userData: any;
	sendOTP(data: any) {
		this.userData = data;
		let digits: string = '0123456789',
			otp = '';
		for (let i = 0; i < 6; i++) {
			// otp += digits[Math.floor(Math.random() * 10)];
			otp += 0;
		}
		this.OTP = otp;
		let body: string = `The OTP for Phd Thesis Tracking System is ${otp} please do not share this with anyone. This is for your information, please do not respond to this mail. It will not be monitored.`;
		this.flag_ = true;
		this.mail.sendMail(sessionStorage.getItem('email') || '', body);
	}

	validateOTP(data: any) {
		if (data.otp === this.OTP) this.update(this.userData);
		else {
			Swal.fire('Invalid OTP', 'Enter correct otp', 'error');
		}
	}

}
