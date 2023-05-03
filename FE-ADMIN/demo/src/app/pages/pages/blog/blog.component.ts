import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Blog } from 'src/app/core/model/blog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'vex-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  // rows: Blog[] = [];
  rows: Blog[] = [
    {id : 1, title : "Test", image : " ", description: "test", shortDescription: "test", author: "test"},
    {id : 2, title : "Test 2", image : " ", description: "test 2", shortDescription: "test 2", author: "test 2"},
    {id : 3, title : "Test 3", image : " ", description: "test 3", shortDescription: "test 3", author: "test 3 "},

    ];
  searchForm: any;
  isLoading = false;
  constructor(
     private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,) { }

    dataSource: MatTableDataSource<Blog> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Blog>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Title', property: 'title', type: 'text', visible: true },
    { label: 'Image', property: 'image', type: 'text', visible: true, },
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
    // debugger
    this.isLoading = true;
    console.log(this.rows);
    this.dataSource.data = this.rows;
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
