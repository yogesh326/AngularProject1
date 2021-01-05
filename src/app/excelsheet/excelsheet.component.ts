import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  data: [][];
  constructor() { }

  ngOnInit(): void {
  }
onFileChange(evt: any) {
  const target : DataTransfer = <DataTransfer>(evt.target);

  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();
  
  reader.onload = (e: any) => {
const bstr: string = e.target.result;

const wb: xlsx.WorkBook = xlsx.read(bstr, { type: 'binary' });

const wsname : string = wb.SheetNames[0];

const ws: xlsx.WorkSheet = wb.Sheets[wsname];

console.log(ws);

this.data = (xlsx.utils.sheet_to_json(ws, { header: 1}));

console.log(this.data);
  };
   
  reader.readAsBinaryString(target.files[0]);
}
}
