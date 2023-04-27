import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Blog } from 'src/app/core/model/blog';
import { FormBuilder } from '@angular/forms';
import { Contact } from 'src/app/core/model/contact';

@Component({
  selector: 'vex-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  rows: Contact[] = [
    {id : 1, name : "Test", email : " test@gmail.com", subject: "test", phone: "test", message: "test"},
    {id : 2, name : "Test 2", email : " test1@gmail.com", subject: "test 2", phone: "test 2", message: "test 2"},
    {id : 3, name : "Test 3", email : " test2@gmail.com", subject: "test 3", phone: "test 3", message: "test 3 "},

    ];
  searchForm: any;
  isLoading = false;
  constructor(
     private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,) { }

    dataSource: MatTableDataSource<Contact> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Contact>[] = [
    { label: 'Id', property: 'id', type: 'text', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Email', property: 'email', type: 'text', visible: true, },
    { label: 'Subject', property: 'subject', type: 'text', visible: true },
    { label: 'Phone', property: 'phone', type: 'text', visible: true },
    { label: 'Message', property: 'message', type: 'text', visible: true, },
    { label: 'Actions', property: 'actions', type: 'text', visible: true },
  ];


  ngOnInit(): void {
    debugger
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
    debugger
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