import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	constructor(private router: Router) {}

	flag: boolean = false;
	flag_: boolean = false;

	ngOnInit(): void {
		this.flag_ = !!sessionStorage.getItem('isLoggedIn');
	}

	trackThesis() {
		if (this.flag_) {
			if (parseInt(sessionStorage.getItem('count') || '31') < 31)
				this.router.navigateByUrl('/aadharAuthentication');
			else Swal.fire('You exceded your login limit', '', 'info');
		} else {
			this.router.navigateByUrl('/login');
		}
	}
	getStudents = () => this.router.navigateByUrl('/SupervisorLogin');
}
