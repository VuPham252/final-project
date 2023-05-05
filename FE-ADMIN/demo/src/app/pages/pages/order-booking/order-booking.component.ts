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
import { Order } from 'src/app/core/model/order';
import { OrderData } from 'src/app/core/api/order/order-data';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'vex-order-booking',
  templateUrl: './order-booking.component.html',
  styleUrls: ['./order-booking.component.scss']
})
export class OrderBookingComponent implements OnInit,AfterViewInit {
  rows: Order[] = [];
  searchForm: any;
  isLoading = false;
  listOrder: Order[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 20, 50];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private orderData: OrderData
  ) { }

  dataSource: MatTableDataSource<Order> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Order>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Customer Name', property: 'customerName', type: 'text', visible: true },
    { label: 'Email', property: 'email', type: 'text', visible: true, },
    { label: 'Phone Number', property: 'phoneNumber', type: 'text', visible: true },
    { label: 'Create Time', property: 'createdTime', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();
    this.orderData.search().subscribe((x: Array<Order>) => this.listOrder = x || []);

    this.reloadTable();
  }

  redirectDetail(item: any) {
    this.router.navigate(['/pages/order-detail', item.id]);
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
    this.orderData.search().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
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
