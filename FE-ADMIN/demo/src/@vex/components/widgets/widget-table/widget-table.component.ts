import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../interfaces/table-column.interface';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { FormControl } from '@angular/forms';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY",
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};

@Component({
  selector: 'vex-widget-table',
  templateUrl: './widget-table.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class WidgetTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 6;
  @Output() year: EventEmitter<any> = new EventEmitter();

  visibleColumns: Array<keyof T | string>;
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  date = new FormControl(moment());

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.visibleColumns = this.columns.map(column => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    console.log(this.date.value.year(), ctrlValue);
    this.year.emit(this.date.value.year());
  }
}
