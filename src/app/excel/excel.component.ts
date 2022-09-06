import { Component, OnInit } from '@angular/core';
import { ConnectDBService } from '../services/connectDB/connect-db.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css'],
})
export class ExcelComponent implements OnInit {
  
  constructor(private db: ConnectDBService) {}

  ngOnInit(): void {}

  private sheet_data: any;
  private u_sheet_data: any;

  loadInDB(query: string) {
    this.db.processQuery(query).subscribe((Data) => {
      if (Data.sqlMessage == null) {
        window.alert('Status updated successful');
      } else {
        window.alert(Data.sqlMessage);
      }
    });
  }

  upload() {
    if (this.sheet_data == null) {
      window.alert('File not uploaded or Enter file with data');
      return;
    }
    let query: string = '',
      n = this.sheet_data.length;
    for (let i = 0; i < n; i++) {
      let data: string = '';
      for (let [key, vl] of Object.entries(this.sheet_data[i])) {
        data += `${key} = '${vl}', `;
      }
      query += `insert into status set ${data.slice(0, -2)};\n`;
    }
    this.loadInDB(query);
  }

  update() {
    if (this.u_sheet_data == null) {
      window.alert('File not uploaded or Enter file with data');
      return;
    }
    let query: string = '',
      n = this.u_sheet_data.length;
    for (let i = 0; i < n; i++) {
      let data: string = '',
        obj = this.u_sheet_data[i];
      let roll = obj['roll'];
      if (roll == null) {
        window.alert('roll number must be included');
        return;
      }
      delete obj.roll;
      for (let [key, vl] of Object.entries(obj)) {
        if (vl == null) continue;
        data += `${key} = '${vl}', `;
      }
      query += `update status set ${data.slice(
        0,
        -2
      )} where roll = '${roll}';\n`;
    }
    this.loadInDB(query);
  }

  onFileChange(event: any, flag: number) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      if (flag == 0) this.sheet_data = data;
      if (flag == 1) this.u_sheet_data = data;
    };
  }
}
