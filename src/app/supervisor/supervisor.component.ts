import { Component, OnInit } from '@angular/core';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import { SendMailService } from '../services/sendMail/send-mail.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-supervisor',
	templateUrl: './supervisor.component.html',
	styleUrls: ['./supervisor.component.css'],
})
export class SupervisorComponent implements OnInit {
	constructor(private db: ConnectDBService, private mail: SendMailService) {}
	isValidUser: boolean = false;
	showTable: boolean = false;
	flag: boolean = false;

	ngOnInit(): void {
		this.isValidUser = false;
		this.showTable = false;
	}
	private OTP: string = '';
	public rolls: any = {};

	isUserExisted(data: any) {
		let query: string = `select roll from users where Semail = '${data.Semail}' or Cemail = '${data.Semail}'`;
		this.db.processQuery(query).subscribe((Data) => {
			if (Data.length === 0 || Data.length == undefined) {
				Swal.fire('Email is not valid', 'Please re-enter your email', 'error');
			} else {
				this.rolls = Data;
				this.sendOTP(data.Semail);
			}
		});
	}
	sendOTP(email: string) {
		let digits: string = '0123456789',
			otp: string = '';
		for (let i = 0; i < 6; i++) {
			otp += digits[Math.floor(Math.random() * 10)];
			// otp += 0;
		}
		//console.log(otp);
		this.OTP = otp;
		let body: string = `The OTP for Phd Thesis Tracking System is ${otp} please do not share this with anyone. This is for your information, please do not respond to this mail. It will not be monitored.`;
		this.isValidUser = true;
		this.mail.sendMail(email, body);
	}
	validateOTP(data: any) {
		if (data.otp === this.OTP) {
			this.showTable = true;
		} else {
			Swal.fire('OTP verification failed', 'Please enter your OTP Properly', 'error');
		}
	}

	seeStatus(index: number) {
		let roll = this.rolls[index].roll;
		let query: string = `select * from status where roll = '${roll}'`;
		this.db.processQuery(query).subscribe((Data) => {
			if (Data.length != 0 && Data.length != undefined) {
				this.load(Data[0]);
				this.flag = true;
			} else {
				Swal.fire(
					'status not avaliable yet',
					'please try again later',
					'warning'
				);
				this.flag = false;
			}
		});
	}

	/*
  public E1: any = ['E1_mail', 'E1_ARW', 'E1_lift', 'E1_process', 'E1_arrived'];
  public E2: any = ['E2_mail', 'E2_ARW', 'E2_lift', 'E2_process', 'E2_arrived'];
  public E3: any = ['E3_mail', 'E3_ARW', 'E3_lift', 'E3_process', 'E3_arrived'];
  public names: any = [
    'Mail sent on Date : ',
    'responce given on Date : ',
    'lifted on Date : ',
    'Processing completed on Date : ',
    'Thesis arrived on Date : '
  ];*/

	// public E1: any = ['E1_mail', 'E1_lift', 'E1_process', 'E1_arrived'];
	// public E2: any = ['E2_mail', 'E2_lift', 'E2_process', 'E2_arrived'];
	// public E3: any = ['E3_mail', 'E3_lift', 'E3_process', 'E3_arrived'];
	// public names: any = [
	// 	'Synopsis Communicated',
	// 	'Thesis Communicated (Lifted)',
	// 	'In Progress',
	// 	'Thesis Report Arrived',
	// ];

	public E1: any = ['E1_mail', 'E1_lift', 'E1_arrived'];
	public E2: any = ['E2_mail', 'E2_lift', 'E2_arrived'];
	public E3: any = ['E3_mail', 'E3_lift', 'E3_arrived'];
	public names: any = [
		'Synopsis Communicated',
		'Thesis Communicated (Lifted)',
		'Thesis Report Arrived',
	];

	public status: any = {};
	load(data: any) {
		for (const [key, vl] of Object.entries(data)) {
			if (vl != null) this.status[key] = vl;
		}
		/*let A = ['E1_ARW', 'E2_ARW', 'E3_ARW'];
    for (let i of A) {
      let str = this.status[i].slice(2), fr = this.status[i][0];
      if (fr == 'R') fr = 'Rejected';
      else if (fr == 'W') fr = 'Willing';
      else if (fr == 'A') fr = 'Waiting for Response';
      else fr = 'unknown';
      this.status[i] = fr + ' / ' + str;
    }*/
	}
}
