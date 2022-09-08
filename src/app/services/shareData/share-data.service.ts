import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  message: string = `About to launch Beta version with Mobile OTP, and for now please enter '000000' as your OTP`;

}
