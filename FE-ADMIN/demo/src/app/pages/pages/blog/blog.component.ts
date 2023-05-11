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
import { ConfirmDialogComponent } from "src/app/dialogs/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";
import { Blog } from "src/app/core/model/blog";
import { FormBuilder } from "@angular/forms";
import { BlogData } from "src/app/core/api/blog/blog-data";
import { BlogCreateUpdateComponent } from "./blog-create-update/blog-create-update.component";
import { AlertService } from "src/app/_services/alert.service";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "vex-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit,AfterViewInit {
  // rows: Blog[] = [];
  rows: Blog[] = [];
  searchForm: any;
  isLoading = false;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 20, 50];
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private blogData: BlogData,
    private a: AlertService
  ) {}

  dataSource: MatTableDataSource<Blog> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  columns: TableColumn<Blog>[] = [
    { label: "NO.", property: "numbers", type: "text", visible: true },
    { label: "Title", property: "title", type: "text", visible: true },
    {
      label: "Description",
      property: "description",
      type: "text",
      visible: false,
    },
    {
      label: "Short Description",
      property: "shortDescription",
      type: "text",
      visible: true,
    },
    { label: "Author", property: "author", type: "text", visible: true },
    { label: "Actions", property: "actions", type: "text", visible: true },
  ];

  ngOnInit(): void {
    // debugger
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10,
    });
    this.dataSource = new MatTableDataSource();

    this.dataSource.data = this.rows;
    this.reloadTable();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    console.log(this.rows);
    this.dataSource.data = this.rows;
    this.blogData.search().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        console.log(response);
        // this.paginator.pageIndex = this.searchObject.pageIndex;
        // this.paginator.pageSize = this.searchObject.pageSize;
        // this.paginator.length = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  view(customer: any) {
    this.dialog.open(BlogCreateUpdateComponent, {
      data: {
        title: "View Blog",
        customer,
        isView: "view",
      }
    })
  }

  create() {
    const dialogConfig = new MatDialogConfig();

    // // Set the size of the dialog
    dialogConfig.width = "900px";
    // dialogConfig.height = '356px';
    this.dialog
      .open(BlogCreateUpdateComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if(result) {
          this.reloadTable();
        }
      });
  }

  update(item: any) {
    this.dialog
      .open(BlogCreateUpdateComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((updatedBlog) => {
        if(updatedBlog) {
          this.reloadTable();
        }
      });
  }

  handleDelete(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: "400px",
      data: {
        title: "Delete Blog",
        text: "Are you sure want to remove this Blog? You will not be able to recover this Blog!",
        onYesClick: () => {
          this.delete(id);
        },
      },
    });
  }

  delete(id: number) {
    this.blogData.deleteById(id).subscribe({
      next: () => {
        this.reloadTable();
        this.a.success("Delete success");
        this.dialog.closeAll();
      },
      error: (error) => {
        this.a.error("Delete fail");
        console.log(error);
      },
    });
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
