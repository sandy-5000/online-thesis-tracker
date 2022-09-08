import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SendMailService {
	constructor(private httpClient: HttpClient) {}

	send(url: string, email: string, body: string): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('email', email);
		formData.append('body', body);
		return this.httpClient.post<any>(url, formData);
	}

	// http://localhost:80/__final/phpmailer/index.php
	// https://phdtracking.jntukexams.net/server/phpmailer/index.php
	sendMail(email: string, body: string) {
		// this.send('https://phdtracking.jntukexams.net/server/phpmailer/index.php', email, body).subscribe(
		this.send('https://phdtracking.jntukexams.net/server/phpmailer/index.php', email, body).subscribe(
			data => {
				let res: any = data;
				console.log(res);
			},
			err => console.log(err)
		);
	}
}
