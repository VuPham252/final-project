import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/core/model/booking';
import { OrderDetail } from 'src/app/core/model/order';
import { OrderData } from 'src/app/core/api/order/order-data';
import { OrderDetailCreateUpdateComponent } from './order-booking-create-update/order-detail-create-update.component';
import { CheckOutData } from 'src/app/core/api/check-out/check-out-data';
import { CheckOut } from 'src/app/core/model/checkOut';
import { AlertService } from 'src/app/_services/alert.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'vex-order-booking',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit,AfterViewInit {
  rows: OrderDetail[] = [];
  searchForm: any;
  isLoading = false;
  listOrderDetail: OrderDetail[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 20, 50];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private orderDetailData: OrderData,
    private checkOutData: CheckOutData,
    private a : AlertService
  ) { }

  dataSource: MatTableDataSource<OrderDetail> = new MatTableDataSource();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @Input()
  columns: TableColumn<OrderDetail>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: false },
    { label: 'Check In', property: 'checkInDate', type: 'text', visible: true, },
    { label: 'Check Out', property: 'checkOutDate', type: 'text', visible: true },
    { label: 'Status', property: 'status', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();
    // this.orderDetailData.search().subscribe((x: Array<OrderDetail>) => this.listOrderDetail = x || []);
    this.reloadTable();
  }

  create(item: any) {
    const dialogConfig = new MatDialogConfig();
    // // Set the size of the dialog
     dialogConfig.width = '900px';
    // dialogConfig.height = '356px';
    this.dialog.open(OrderDetailCreateUpdateComponent, { data: {data: item, mode: 'check-in'} }).afterClosed().subscribe(result => {
      this.reloadTable();
    });
  }

  checkOut(id: number) {
    let item: CheckOut = { orderId: id }
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: '400px',
      data: {
        title: "Check Out",
        text: "Are you sure want to Check Out?",
        onYesClick: () => { this.checkOutData.checkOut(item).subscribe({
          next: (res) => {
            console.log(res);
            this.a.success("Check Out success");
            this.dialog.closeAll();
          },
          error: (err) => {
            console.log(err);
            this.a.success("Check Out failed");
            this.dialog.closeAll();
          }
        }) }
      }
    }).afterClosed().subscribe(result => {
      this.reloadTable();
    });;
  }

  Cancel(id: number) {
    let item: CheckOut = { orderId: id }
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: '400px',
      data: {
        title: "Cancel",
        text: "Are you sure want to cancel order?",
        onYesClick: () => { this.checkOutData.Cancel(item).subscribe({
          next: (res) => {
            console.log(res);
            this.a.success("Cancel success");
            this.dialog.closeAll();
          },
          error: (err) => {
            console.log(err);
            this.a.success("Cancel failed");
            this.dialog.closeAll();
          }
        }) }
      }
    }).afterClosed().subscribe(result => {
      this.reloadTable();
    });;
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
  reloadTable() {
    this.isLoading = true;
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderDetailData.getById(id).subscribe({
      next: (res) => {
        this.listOrderDetail = res;
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
