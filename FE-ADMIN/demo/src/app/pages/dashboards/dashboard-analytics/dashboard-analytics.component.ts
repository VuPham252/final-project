import { Component } from '@angular/core';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { RoomData } from 'src/app/core/api/room/room-data';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { Room } from 'src/app/core/model/room';
import { roomType } from 'src/app/core/model/room-type';
import { MatTableDataSource } from '@angular/material/table';
import { OrderData } from 'src/app/core/api/order/order-data';
import { BookingData } from 'src/app/core/api/booking/booking-data';
import { ContactData } from 'src/app/core/api/contact/contact-data';
import { BlogData } from 'src/app/core/api/blog/blog-data';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  grid: ApexGrid;
};

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent {
  dataSource: MatTableDataSource<roomType> | null;
  numberRoom: number;
  numberOrder: number = 0;
  numberContacts: string = '';
  numberBlogs: string = '';

  public year: number = 0;

  constructor(
    private roomData : RoomData,
    private roomType :RoomTypeData,
    private orderData: OrderData,
    private bookingData : BookingData,
    private contactData: ContactData,
    private blogData: BlogData,
  ){}

  tableColumns: TableColumn<any>[] = [

    {
      label: 'Month',
      property: 'month',
      type: 'text'
    },
    {
      label: 'Income ($)',
      property: 'income',
      type: 'text',
      cssClasses: ['font-medium']
    },
  ];
  ngOnInit() {
    this.getIncome();
    this.getNumberRoom();
    this.getOrderBooking();
    this.getContact();
    this.getBlog();
    this.dataSource = new MatTableDataSource();

  }

  getIncome(){
    if(this.year <= 0) {
      this.year = new Date().getFullYear();
    }
    this.bookingData.income(this.year).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.tableData = this.dataSource.data;
        console.log(res);
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  getNumberRoom(){
    this.roomData.search()
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.numberRoom = response.length;

        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  getOrderBooking() {
    this.orderData.search().subscribe({
      next: (res) => {
        // debugger
        this.numberOrder = res.length;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getContact() {
    this.contactData.search().subscribe({
      next: (res) => {
        this.numberContacts = `${res.length}`;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getBlog() {
    this.blogData.search().subscribe({
      next: (res) => {
        this.numberBlogs = `${res.length}`;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getYear(event: any) {
    this.year = event;
    this.getIncome();
  }

  tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Users',
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
    },
    {
      name: 'Sessions',
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
    },
  ]


  //  = [
  //   {
  //     name: 'Orders',
  //     data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
  //   },
  //   // {
  //   //   name: 'Sessions',
  //   //   data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
  //   // },
  // ];

  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  pageViewsSeries: ApexAxisChartSeries = [{
    name: 'Page Views',
    data: [405, 800, 200, 600, 105, 788, 600, 204]
  }];

  uniqueUsersSeries: ApexAxisChartSeries = [{
    name: 'Unique Users',
    data: [356, 806, 600, 754, 432, 854, 555, 1004]
  }];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    },
    colors: ['#ff9800']
  });

}
