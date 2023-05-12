import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Blog } from 'src/app/core/model/blog';
import { FormBuilder, UntypedFormControl } from '@angular/forms';
import { Contact } from 'src/app/core/model/contact';
import { ContactData } from 'src/app/core/api/contact/contact-data';
import { MatSort } from '@angular/material/sort';
import { ContactCreateUpdateComponent } from './contact-create-update/contact-create-update.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'vex-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  searchForm: any;
  isLoading = false;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 20, 50];
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
     private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private contactData :ContactData) { }

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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // debugger
    this.searchForm = this.formBuilder.group({
      keyword: null,
      pageIndex: 1,
      pageSize: 10
    })
    this.dataSource = new MatTableDataSource();

    // this.dataSource.data = this.rows;
    this.reloadTable();

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: Contact, filter: string) => {
      return data.name.toLocaleLowerCase().includes(filter);
     };
  }

  view(customer: Contact) {
    this.dialog.open(ContactCreateUpdateComponent, {
      data: {
        title: "View Contact",
        customer,
        isView: "view",
      }
    })
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
    this.contactData.search()
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          console.log(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
    //   })
    })
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
