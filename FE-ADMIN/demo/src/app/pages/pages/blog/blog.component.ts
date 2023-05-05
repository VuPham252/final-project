import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Blog } from 'src/app/core/model/blog';
import { FormBuilder } from '@angular/forms';
import { BlogData } from 'src/app/core/api/blog/blog-data';
import { BlogCreateUpdateComponent } from './blog-create-update/blog-create-update.component';

@Component({
  selector: 'vex-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  // rows: Blog[] = [];
  rows: Blog[] = [
    ];
  searchForm: any;
  isLoading = false;
  constructor(
     private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private blogData: BlogData) { }

    dataSource: MatTableDataSource<Blog> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Blog>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Title', property: 'title', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Short Description', property: 'shortDescription', type: 'text', visible: true },
    { label: 'Author', property: 'author', type: 'text', visible: true, },
    { label: 'Actions', property: 'actions', type: 'text', visible: true },
  ];


  ngOnInit(): void {
    // debugger
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();

    this.dataSource.data = this.rows;
    this.reloadTable();
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
    this.blogData.search()
      .subscribe({
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
        }
      })
  }

  create() {
    const dialogConfig = new MatDialogConfig();

    // // Set the size of the dialog
     dialogConfig.width = '900px';
    // dialogConfig.height = '356px';
    this.dialog.open(BlogCreateUpdateComponent, dialogConfig).afterClosed().subscribe(result => {
      this.reloadTable();
    });
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
