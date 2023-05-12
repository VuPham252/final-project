import { Component, Input, OnInit } from "@angular/core";
import { ApexOptions } from "../../chart/chart.component";
import { defaultChartOptions } from "../../../utils/default-chart-options";
import { createDateArray } from "../../../utils/create-date-array";
import { FormControl } from "@angular/forms";
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
import { BookingData } from "src/app/core/api/booking/booking-data";

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
  selector: "vex-widget-large-chart",
  templateUrl: "./widget-large-chart.component.html",
  styleUrls: ["./widget-large-chart.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class WidgetLargeChartComponent implements OnInit {
  public monthValue: string = "";
  public months: any[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  public chartData: any;
  public bookingCountData: any[] = [];
  public chartTypeName: any[] = [];
  public chartBookingCount: [{name: string, data: any[]}] = [
    {
      name: 'Orders',
      data: [],
    }
  ];
  public currentMonth: any;

  @Input() series: ApexAxisChartSeries = [];

  @Input() options: ApexOptions = defaultChartOptions({
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: this.chartTypeName,
      labels: {
        style: {
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8",
          ],
          fontSize: "12px",
        },
      },
    },
  });

  // @Input() options: ApexOptions = {

  // };

  date = new FormControl(moment());

  constructor(private bookingData: BookingData) {}

  ngOnInit() {
    let year = new Date().getFullYear();
    let objDate = new Date();
    objDate.setMonth(objDate.getMonth());
    this.monthValue = objDate.toLocaleString("en-us", { month: "long" });
    console.log("month", this.monthValue);
    this.bookingData.bookingCount(year).subscribe({
      next: (res) => {
        console.log(res);
        this.chartData = res;
        let itemData = res.bookingCountResponseList.find(data => data.month === this.monthValue);
        console.log("itemData", itemData);
        this.bookingCountData = itemData.bookingCountList;
        this.chartBookingCount = [{name: 'Orders', data: []}];
        for (let i = 0; i < this.bookingCountData.length; i++) {
          this.chartBookingCount[0].data.push(this.bookingCountData[i].booking_count);
          this.chartTypeName.push(this.bookingCountData[i].type_name);
        }
        this.series = this.chartBookingCount;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    console.log(this.date.value.year(), ctrlValue);
    this.bookingData.bookingCount(this.date.value.year()).subscribe({
      next: (res) => {
        console.log(res);
        this.chartData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMonthValue(value: any) {
    // debugger
    this.monthValue = value;
  }

  Filter(event: any) {
    // debugger
    let item = this.chartData.bookingCountResponseList;
    console.log("item", item);
    for (let i = 0; i < item.length; i++) {
      if (item[i].month == event.value) {
        this.bookingCountData = item[i].bookingCountList;
        break;
      }
    }
    this.chartBookingCount = [{name: 'Orders', data: []}];
    for (let i = 0; i < this.bookingCountData.length; i++) {
      this.chartBookingCount[0].data.push(this.bookingCountData[i].booking_count);
      this.chartTypeName.push(this.bookingCountData[i].type_name);
    }
    this.series = this.chartBookingCount;
    // this.options.xaxis.categories = this.chartTypeName;

  }
}
