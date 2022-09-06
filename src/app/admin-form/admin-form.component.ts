import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConnectDBService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  constructor(private db: ConnectDBService) { }

  ngOnInit(): void {
  }

  status: any;

  updateStatus(data: any) {
    if (data.roll == '') {
      Swal.fire('Enter proper roll number', '', 'warning');
      return;
    }
    if (data.status == '' || data.status == undefined) {
		  Swal.fire('Select an option for status', '', 'warning');
		  return;
	  }
    let roll = data.roll;  
    let st_flag = data.status == 1;
    let query: string = `${st_flag ? 'insert into' : 'update'} status set ${st_flag ? "roll = '" + roll + "', " : ''}`;
    delete data.status;
    delete data.roll;
    for (let [key, value] of Object.entries(data)) {
      let date = String(value);
      date = `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
      if (!!value && date[0] != '-') 
        query += `${key} = '${date}', `;
    }
    query = query.slice(0, -2);
    query += !st_flag ? ` where roll = '${roll}';` : ';';
    this.db.processQuery(query).subscribe(dt => {
      this.status = null;
      if (dt.errno != undefined || dt.length == undefined) {
        Swal.fire('Status not updated', 'Please check the status of that student', 'error');
      } else {
        Swal.fire('Status updated Successfully', '', 'success');
      }
    });
    return true;
  }

}
