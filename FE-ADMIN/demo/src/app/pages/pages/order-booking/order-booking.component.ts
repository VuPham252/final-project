import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { FormBuilder, UntypedFormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { OrderBookingCreateUpdateComponent } from "./order-booking-create-update/order-booking-create-update.component";
import { Order } from "src/app/core/model/order";
import { OrderData } from "src/app/core/api/order/order-data";
import { MatSort } from "@angular/material/sort";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";

@UntilDestroy()
@Component({
  selector: "vex-order-booking",
  templateUrl: "./order-booking.component.html",
  styleUrls: ["./order-booking.component.scss"],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class OrderBookingComponent implements OnInit, AfterViewInit {
  rows: Order[] = [];
  searchForm: any;
  isLoading = false;
  listOrder: Order[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 20, 50];
  filter: any[] = [
    {
      name: "Customer Name",
      value: "customerName",
    },
    {
      name: "Phone Number",
      value: "phoneNumber",
    },
    {
      name: "Email Address",
      value: "email",
    },
  ];
  filterValue = {
    name: "Phone Number",
    value: "phoneNumber",
  };
  searchCtrl = new UntypedFormControl();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private orderData: OrderData
  ) {}

  dataSource: MatTableDataSource<Order> | null;

  @Input()
  columns: TableColumn<Order>[] = [
    { label: "NO.", property: "numbers", type: "text", visible: true },
    {
      label: "Customer Name",
      property: "customerName",
      type: "text",
      visible: true,
    },
    { label: "Email", property: "email", type: "text", visible: true },
    {
      label: "Phone Number",
      property: "phoneNumber",
      type: "text",
      visible: true,
    },
    {
      label: "List Room Type",
      property: "roomTypeNameList",
      type: "text",
      visible: true,
    },
    {
      label: "Create Time",
      property: "createdTime",
      type: "text",
      visible: true,
    },
    { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    console.log(typeof this.pageSizeOptions);

    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10,
    });
    this.dataSource = new MatTableDataSource();
    this.orderData
      .search()
      .subscribe((x: Array<Order>) => (this.listOrder = x || []));

    this.reloadTable();

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  isObject(value: any) {
    return typeof value === "object";
  }

  getFilterValue(value: any) {
    this.filterValue = value;
  }

  onFilterChange(value: string) {
    debugger;
    let a = this.filterValue.value;
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      if (data.hasOwnProperty(a)) {
        debugger;
        return data[a].toLocaleLowerCase().includes(filter);
      } else {
        debugger;
        return data.phoneNumber.toLocaleLowerCase().includes(filter);
      }
    };
    this.dataSource.filter = value;
  }

  // onFilterChange(value: string) {
  //   if (!this.dataSource) {
  //     return;
  //   }
  //   value = value.trim();
  //   value = value.toLowerCase();
  //   this.dataSource.filter = value;
  //   this.dataSource.filterPredicate = (data: Order, filter: string) => {
  //     return data.phoneNumber.toLocaleLowerCase().includes(filter);
  //    };
  // }

  redirectDetail(item: any) {
    this.router.navigate(["/pages/order-detail", item.id]);
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
    dialogConfig.width = "900px";
    // dialogConfig.height = '356px';
    this.dialog
      .open(OrderBookingCreateUpdateComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        this.reloadTable();
      });
  }
  reloadTable() {
    this.isLoading = true;
    this.orderData.search().subscribe({
      next: (res) => {
        // debugger
        this.dataSource.data = res;
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
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
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}
