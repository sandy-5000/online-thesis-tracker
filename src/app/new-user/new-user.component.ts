import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConnectDBService } from '../services/connectDB/connect-db.service';

@Component({
	selector: 'app-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
	constructor(private db: ConnectDBService) {}

	ngOnInit(): void {}

	_flag: number = -1;
	setFlag = (num: number) => (this._flag = num);

	insert(data: any) {
		if (this._flag != 0 && this._flag != 1) return;
		if (data.roll === '') {
			Swal.fire(
				'Roll Number Field should not be empty',
				'Enter Proper Roll Number',
				'warning'
			);
			return;
		}
		if (data.email === '') {
			Swal.fire(
				'Email field should not be empty',
				'Enter Proper email',
				'warning'
			);
			return;
		}
		let query: string =
			this._flag == 0
				? `insert into user_mails set roll = '${data.roll}', email = '${data.email}';`
				: `update user_mails set email = '${data.email}' where roll = '${data.roll}';`;
		this.db.processQuery(query).subscribe((dt) => {
			if (dt.errno != undefined) {
				Swal.fire(
					this._flag == 0
						? 'User email register failed!'
						: 'User email update failed!',
					'please check your data',
					'error'
				);
			} else {
				Swal.fire(
					this._flag == 0
						? 'User email registered!'
						: 'User email updated',
					'',
					'success'
				);
			}
		});
	}
}
