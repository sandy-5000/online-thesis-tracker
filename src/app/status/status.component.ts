import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor() { }

  public roll: string = "";

  public names: any = ['Synopsis Communicated', 'Thesis Communicated (Lifted)', 'In Progress', 'Thesis Report Arrived'];

  public bar1: any = { 1: "", 2: "" };
  public bar2: any = { 1: "", 2: "", 3: "", 4: "", 5: "", name: 'none' };
  public bar3: any = { 1: "", 2: "", 3: "", 4: "", 5: "", name: 'none' };
  public bar4: any = { 1: "", 2: "", 3: "", 4: "", 5: "", name: 'none' };

  ts: any = {};
  ngOnInit(): void {
    this.ts = JSON.parse(sessionStorage.getItem('status') || '');
    this.ts.last = true;
    this.load();
  }

  load() {
    if (!this.ts) return;

    this.roll = this.ts.roll;
    let A = this.ts;
    let Bar = [this.bar2, this.bar3, this.bar4];

    // this.bar1[1] = this.ts.RD_dispatch != null ? 'active' : '';
    // if (this.ts.DE_office != null) {
    //   this.bar1[1] = 'done'; this.bar1[2] = 'done';
    // } else this.bar1[2] = '';

    if (this.ts.DE_office != null) {
      this.bar1[2] = 'done';      
    }
    
    // let E1 = ['E1_mail', 'E1_ARW', 'E1_lift', 'E1_process', 'E1_arrived', 'last'];
    // let E2 = ['E2_mail', 'E2_ARW', 'E2_lift', 'E2_process', 'E2_arrived', 'last'];
    // let E3 = ['E3_mail', 'E3_ARW', 'E3_lift', 'E3_process', 'E3_arrived', 'last'];
    // let E = [E1, E2, E3];

    // let E1 = ['E1_mail', 'E1_lift', 'E1_process', 'E1_arrived', 'last'];
    // let E2 = ['E2_mail', 'E2_lift', 'E2_process', 'E2_arrived', 'last'];
    // let E3 = ['E3_mail', 'E3_lift', 'E3_process', 'E3_arrived', 'last'];
    // let E = [E1, E2, E3];

    let E1 = ['E1_mail', 'E1_lift', 'E1_arrived', 'last'];
	  let E2 = ['E2_mail', 'E2_lift', 'E2_arrived', 'last'];
	  let E3 = ['E3_mail', 'E3_lift', 'E3_arrived', 'last'];
	  let E = [E1, E2, E3];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (A[E[i][j]] != null && A[E[i][j + 1]] != null) Bar[i][j + 1] = `done-${i + 1}`;
        else if (A[E[i][j]] != null) Bar[i][j + 1] = `active-${i + 1}`;
        else { Bar[i][j + 1] = ''; A[E[i][j]] = '---' }
      }
      /*
      if (A[E[i][1]] != null) {
        if (A[E[i][1]][0] == 'W') Bar[i]['name'] = 'Willing';
        else if (A[E[i][1]][0] == 'R') Bar[i]['name'] = 'Rejected';
        else if (A[E[i][1]][0] == 'A') Bar[i]['name'] = 'Waiting for Response';
      } else { Bar[i]['name'] = '---'; A[E[i][1]] = '-----' } */
    }
  }

}
