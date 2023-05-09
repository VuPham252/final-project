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

  public userSessionsSeries: Partial<ChartOptions>;

  constructor(
    private roomData : RoomData,
    private roomType :RoomTypeData,
    private orderData: OrderData,
  ){
    this.userSessionsSeries = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"]
        ],
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
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    }
  }

  tableColumns: TableColumn<roomType>[] = [

    {
      label: 'NAME',
      property: 'typeName',
      type: 'text'
    },
    {
      label: '$ PRICE',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
  ];
  ngOnInit() {
    this.getDataRoom();
    this.getNumberRoom();
    this.getOrderBooking();
    this.dataSource = new MatTableDataSource();

  }
  getDataRoom(){
    this.roomType.search().subscribe({
      next: (res) => {

        this.dataSource.data = res;
        this.tableData = this.dataSource.data;
        console.log(res);
      },
      error: (err) =>{

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
        this.numberOrder = res.length;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];


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
