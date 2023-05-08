import { Component } from '@angular/core';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { RoomData } from 'src/app/core/api/room/room-data';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { Room } from 'src/app/core/model/room';
import { roomType } from 'src/app/core/model/room-type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent {
  dataSource: MatTableDataSource<roomType> | null;
  numberRoom: number;
  constructor(
    private roomData : RoomData,
    private roomType :RoomTypeData
  ){}

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

  tableData = tableSalesData;

  series: ApexAxisChartSeries = [{
    name: 'Subscribers',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
  }];

  userSessionsSeries = defaultChartOptions({
    chart: {
      type: 'bar',
    },
    series: [
      {
        name: 'Orders',
        data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
      },
    ]
  })
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
