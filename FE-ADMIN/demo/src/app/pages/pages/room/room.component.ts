import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { Room } from 'src/app/core/model/room';
import { FormBuilder, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomData } from 'src/app/core/api/room/room-data';
import { RoomCreateUpdateComponent } from './room-create-update/room-create-update.component';
import { roomType } from 'src/app/core/model/room-type';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { config } from 'process';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'vex-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rows: Room[] = [];
  searchForm: any;
  isLoading = false;
  listRoomType: roomType[] = [];
  searchCtrl = new UntypedFormControl();

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private roomData : RoomData,
    private roomType :RoomTypeData
  ) { }

  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  @Input()
  columns: TableColumn<Room>[] = [
    { label: 'NO.', property: 'numbers', type: 'text', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Room Type', property: 'roomTypeId', type: 'text', visible: true, },
    { label: 'Area', property: 'area', type: 'text', visible: true },
    { label: 'Size', property: 'size', type: 'text', visible: true },
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
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.reloadTable();
  }

  submitSearch() {
    // this.searchObject.keyword = this.searchForm.value.keyword;
    // this.searchObject.pageIndex = 1;
    this.reloadTable();
  }

  create() {
    const dialogConfig = new MatDialogConfig();

    // // Set the size of the dialog
     dialogConfig.width = '900px';
    // dialogConfig.height = '356px';
    this.dialog.open(RoomCreateUpdateComponent, dialogConfig).afterClosed().subscribe(result => {
      this.reloadTable();
    });
  }

  update(occupation: Room) {
     const dialogConfig = new MatDialogConfig();

    // // Set the size of the dialog
     dialogConfig.width = '900px';
    this.roomData.getById(occupation.id)
      .subscribe({
        next: (response) => {
          this.dialog.open(RoomCreateUpdateComponent , {
            data: response
          }).afterClosed().subscribe(result => {
            this.reloadTable();
          });
        }, error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      })
  }
  view(occupation: Room) {
    const dialogConfig = new MatDialogConfig();

   // // Set the size of the dialog
    dialogConfig.width = '900px';
   this.roomData.getById(occupation.id)
     .subscribe({
       next: (response) => {
         this.dialog.open(RoomCreateUpdateComponent , {
           data: {
            roomData: response,
            isView: "view"
           }
         }).afterClosed().subscribe(result => {

           this.reloadTable();
         });
       }, error: (error) => {
         console.log(error);
         this.isLoading = false;
       }
     })
 }
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: Room, filter: string) => {
      return data.name.toLocaleLowerCase().includes(filter);
     };
  }


  handlePageEvent(event: PageEvent) {
    // this.searchObject.pageIndex = event.pageIndex + 1;
    // this.searchObject.pageSize = event.pageSize;
    this.reloadTable();
  }

  reloadTable() {
    this.isLoading = true;
    this.roomData.search()
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

  delete(id: number) {
    this.roomData.deleteById(id)
      .subscribe({
        next: () => {
          this.reloadTable();
          this.dialog.closeAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  handleDelete(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      width: '400px',
      data: {
        title: "Are you sure want to remove this Room",
        text: "You will not be able to recover this Room!",
        onYesClick: () => { this.delete(id) }
      }
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
