import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Room } from 'src/app/core/model/room';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { roomType } from 'src/app/core/model/room-type';
import { Booking } from 'src/app/core/model/booking';
import { RoomData } from 'src/app/core/api/room/room-data';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { OrderBookingCreateUpdateComponent } from './order-booking-create-update/order-booking-create-update.component';

@Component({
  selector: 'vex-order-booking',
  templateUrl: './order-booking.component.html',
  styleUrls: ['./order-booking.component.scss']
})
export class OrderBookingComponent implements OnInit {
  rows: Booking[] = [];
  searchForm: any;
  isLoading = false;
  listRoomType: roomType[] = [];
  listRoom: Room[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private roomData : RoomData,
    private roomType :RoomTypeData
  ) { }

  dataSource: MatTableDataSource<Booking> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Booking>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Order', property: 'orderId', type: 'text', visible: true },
    { label: 'Room Type', property: 'roomTypeId', type: 'text', visible: true, },
    { label: 'Room', property: 'roomId', type: 'text', visible: true },
    { label: 'Amount', property: 'amount', type: 'text', visible: true },
    { label: 'Check in date', property: 'checkInDate', type: 'text', visible: true },
    { label: 'Check out date', property: 'checkOutDate', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();
    this.roomType.search().subscribe((x: Array<roomType>) => this.listRoomType = x || []);
    this.roomData.search().subscribe((x : Array<Room> ) => this.listRoom = x || []);
    // this.reloadTable();
  }

  submitSearch() {
    // this.searchObject.keyword = this.searchForm.value.keyword;
    // this.searchObject.pageIndex = 1;
    this.reloadTable();
  }
  handlePageEvent(event: PageEvent) {
    // this.searchObject.pageIndex = event.pageIndex + 1;
    // this.searchObject.pageSize = event.pageSize;
    this.reloadTable();
  }
  create() {
    const dialogConfig = new MatDialogConfig();

    // // Set the size of the dialog
     dialogConfig.width = '900px';
    // dialogConfig.height = '356px';
    this.dialog.open(OrderBookingCreateUpdateComponent, dialogConfig).afterClosed().subscribe(result => {
      this.reloadTable();
    });
  }
  reloadTable() {
    this.isLoading = true;
    // this.roomData.search()
    //   .subscribe({
    //     next: (response) => {
    //       this.dataSource.data = response;
    //       console.log(response);
    //       // this.paginator.pageIndex = this.searchObject.pageIndex;
    //       // this.paginator.pageSize = this.searchObject.pageSize;
    //       // this.paginator.length = response.totalElements;
    //       this.isLoading = false;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.isLoading = false;
    //     }
    //   })
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}
