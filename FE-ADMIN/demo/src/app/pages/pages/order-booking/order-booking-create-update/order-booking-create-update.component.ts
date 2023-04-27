import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { RoomData } from 'src/app/core/api/room/room-data';
import { Room } from 'src/app/core/model/room';
import { roomType } from 'src/app/core/model/room-type';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'vex-order-booking-create-update',
  templateUrl: './order-booking-create-update.component.html',
  styleUrls: ['./order-booking-create-update.component.scss']
})
export class OrderBookingCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  listRoomType: roomType[] = [];
  listRoom : Room[] = [];
  @Input() isView: string;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private roomData : RoomData,
    private dialog: MatDialog,
    private roomType :RoomTypeData
    ) { }
    get f() { return this.form.controls; }

    ngOnInit(): void {
      this.form = this.fb.group({
        id: '',
        customerName: [ '', [Validators.required]],
        email:  [ '', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        roomTypeId: [ '', [Validators.required]],
        room: ['', [Validators.required]],
        checkInDate: ['', [Validators.required]],
        checkOutDate: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        status: ['', [Validators.required]],

      })
      // this.route.data.subscribe(e => {
      //   this.isView = e?.isView;
      // })
      // this.id = this.route.snapshot.params['id'];
      // this.isCreateMode = !this.id;
      this.roomType.search().subscribe((x: Array<roomType>) => this.listRoomType = x || []);
      if (this.defaults && this.defaults.isView == 'view'){
        this.isView = this.defaults.isView;
        this.form.setValue ( this.defaults.roomData);
      }
      this.roomData.search().subscribe((x: Array<Room>) => this.listRoom = x || []);

      console.log(this.defaults);
      console.log(this.isView);
      if (this.defaults) {
        this.isCreateMode = false;
        this.form.setValue(
          this.defaults
        ) ;
      } else {
        this.isCreateMode = true;
        this.defaults = {} as Room;

      }
    }


    onSubmit() {
      console.log("submit")
      this.submitted = true;
      if (this.form.invalid)
        return;

      const room = this.form.value;

      if(this.isCreateMode){
        this.roomData.save(room)
        .subscribe({
          next: (response) => {
            this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
            this.dialog.closeAll()
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }else{
        room.id =  this.defaults.id;
        this.roomData.update(room.id, room)
        .subscribe({
          next: (response) => {
            this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
            this.dialog.closeAll()
          },
          error: (error) => {
            console.log(error)
            this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
          }
        })
      }


    }

    onNoClick() {
      this.dialog.closeAll()
    }

    close(answer: string) {
      this.dialog.closeAll();
    }


}
