import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/core/model/booking';
import { Order } from 'src/app/core/model/order';
import { OrderData } from 'src/app/core/api/order/order-data';

@Component({
  selector: 'vex-order-booking',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  rows: Order[] = [];
  searchForm: any;
  isLoading = false;
  listOrder: Order[] = [];

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

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();
    this.orderData.search().subscribe((x: Array<Order>) => this.listOrder = x || []);
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
