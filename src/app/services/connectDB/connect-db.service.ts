import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectDBService {

  constructor(private httpClient: HttpClient) { }
  // https://phdtracking.jntukexams.net/server/connect.php
  // http://localhost:80/__final/connect.php
  processQuery(query: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('query', query);
    return this.httpClient.post<any>('https://phdtracking.jntukexams.net/server/connect.php', formData);
  }

}
