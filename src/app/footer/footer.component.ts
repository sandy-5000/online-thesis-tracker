import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDBService } from '../services/connectDB/connect-db.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
	constructor(private router: Router, private db: ConnectDBService) {}

	ngOnInit(): void {
		this.getCount();
	}

	count: any;

	getCount() {
		let parameter: string = 'login_count';
		let query: string = `select * from site_data where parameter = '${parameter}'`;
		this.db.processQuery(query).subscribe((dt) => {
			if (dt.errno == undefined && dt.length != 0) {
				this.count = dt[0].value;
			}
		});
	}

	goToAbout = () => this.router.navigateByUrl('/About');
}
