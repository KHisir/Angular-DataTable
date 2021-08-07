import { Component } from '@angular/core';
import { Pager } from './cc-data-table/cc-paginator/pager';
import { Column } from './cc-data-table/model/column/column';
import { TableData } from './tableData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-data-table';

  data: any[] = [];
  columns: any[] = [];

  constructor() {
    this.fetch((json: any) => {
      const res: TableData = new TableData(json);

      this.columns = res.Columns;
      this.data = res.Rows;
    });
  }

  // Get dummy-data:
  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/100k.json');
    req.onload = () => {
      const data = JSON.parse(req.response); // Row[] = []
      cb(data);
    };
    req.send();
  }

  // Events:
  primaryButtonOnclick(res: any): void {
    console.log(res);
  }

  onSort(column: Column): void {
    console.log(column);
  }

  onSearch(column: Column): void {
    console.log(column);
  }

  onPaged(pager: Pager): void {
    console.log(pager);
  }

  valueOnChanged(data: any): void {
    console.log(data);
  }
}
