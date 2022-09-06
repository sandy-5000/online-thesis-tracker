import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConnectDBService } from '../services/connectDB/connect-db.service';

@Component({
	selector: 'app-admin-portal',
	templateUrl: './admin-portal.component.html',
	styleUrls: ['./admin-portal.component.css'],
})
export class AdminPortalComponent implements OnInit {
	constructor(private db: ConnectDBService, private router: Router) {}
	goToNewUser = () => this.router.navigateByUrl('/NewUser');

	loggedIn: boolean = false;
	table_flag: boolean = false;
	all_status: any = {};
	curr_status: any = [];

	ngOnInit(): void {
		this.loggedIn = !!sessionStorage.getItem('AdminLoggedIn');
		this.table_flag = false;
		this.all_status = {};
	}

	// cols: any = ['Roll No.', 'RD_dispatch', 'DE_office', 'Examiner - 1', 'Examiner - 2', 'Examiner - 3'];
	cols: any = [
		'Roll No.',
		'DE_office',
		'Examiner - 1',
		'Examiner - 2',
		'Examiner - 3',
	];

	resetSession() {
		this.db.processQuery(`update users set count = 0`).subscribe(dt => {
			if (dt.errno != undefined) {
				Swal.fire('Session Reset Failed', '', 'error');
			} else {
				Swal.fire('Session Reset Successful', '', 'success');
			}
		});
	}

	showTable() {
		if (this.table_flag == true) {
			this.table_flag = false;
			return;
		}
		let query: string = `select * from status`;
		this.db.processQuery(query).subscribe((Data) => {
			this.table_flag = true;
			this.all_status = Data;
			this.arrangeTable(Data);
		});
	}

	arrangeTable(data: any) {
		let n = data.length;

		// let E1 = ['E1_mail', 'E1_ARW', 'E1_lift', 'E1_process', 'E1_arrived'];
		// let E2 = ['E2_mail', 'E2_ARW', 'E2_lift', 'E2_process', 'E2_arrived'];
		// let E3 = ['E3_mail', 'E3_ARW', 'E3_lift', 'E3_process', 'E3_arrived'];

		// let E1 = ['E1_mail', 'E1_lift', 'E1_process', 'E1_arrived'];
		// let E2 = ['E2_mail', 'E2_lift', 'E2_process', 'E2_arrived'];
		// let E3 = ['E3_mail', 'E3_lift', 'E3_process', 'E3_arrived'];

		let E1 = ['E1_mail', 'E1_lift', 'E1_arrived'];
		let E2 = ['E2_mail', 'E2_lift', 'E2_arrived'];
		let E3 = ['E3_mail', 'E3_lift', 'E3_arrived'];


		for (let i = 0; i < n; i++) {
			let e1 = 'E1_mail',
				e2 = 'E2_mail',
				e3 = 'E3_mail';
			for (let j = 0; j < 3; j++) {
				if (data[i][E1[j]] == null) break;
				e1 = E1[j];
			}
			for (let j = 0; j < 3; j++) {
				if (data[i][E2[j]] == null) break;
				e2 = E2[j];
			}
			for (let j = 0; j < 3; j++) {
				if (data[i][E3[j]] == null) break;
				e3 = E3[j];
			}
			// this.curr_status[i] = ['roll', 'RD_dispatch', 'DE_office', e1, e2, e3];
			this.curr_status[i] = ['roll', 'DE_office', e1, e2, e3];
		}
	}
}
