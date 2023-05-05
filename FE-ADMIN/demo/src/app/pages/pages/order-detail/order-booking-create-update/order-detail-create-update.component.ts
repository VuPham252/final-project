import { Component, ElementRef, Inject, Input, OnInit } from "@angular/core";
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomTypeData } from "src/app/core/api/room-type/room-type-data";
import { RoomData } from "src/app/core/api/room/room-data";
import { Room } from "src/app/core/model/room";
import { roomType } from "src/app/core/model/room-type";
import { AlertService } from "src/app/_services/alert.service";
import { BookingData } from "src/app/core/api/booking/booking-data";
import { Booking } from "src/app/core/model/booking";
import { CheckInData } from "src/app/core/api/check-in/check-in-data";

@Component({
  selector: "vex-order-detail-create-update",
  templateUrl: "./order-detail-create-update.component.html",
  styleUrls: ["./order-detail-create-update.component.scss"],
})
export class OrderDetailCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  listRoom: Room[] = [];
  @Input() isView: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private roomData: RoomData,
    private bookingData: BookingData,
    private checkInData: CheckInData,
    private dialog: MatDialog
  ) {}

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
    let item = {
      inputCheckinDate: this.defaults.data.checkInDate,
      inputCheckoutDate: this.defaults.data.checkOutDate,
      roomTypeId: this.defaults.data.roomTypeId
    }
    this.bookingData.checkAvaAdmin(item).subscribe({
      next: (res) => {
        this.listRoom = res;
        console.log(this.listRoom);
      },
      error: (err) => {
        console.log(err);
      }
    });
    // this.roomData.search().subscribe({
    //   next: (res) => {
    //     for (let i = 0; i < res.length; i++) {
    //       if(this.defaults.roomTypeId == res[i].roomTypeId)
    //         this.listRoom.push(res[i]);
    //     }
    //     console.log(this.listRoom);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
    if (this.defaults && this.defaults.mode == "check-in") {
      this.isCreateMode = false;
      this.form = this.fb.group({
        id: 0,
        roomId: [0, [Validators.required]],
        orderId: [this.defaults.data.id, []],
      });
    }
  }

  onSubmit() {
    console.log("submit");
    this.submitted = true;
    if (this.form.invalid) return;

    const room = this.form.value;

    this.checkInData.checkIn(room).subscribe({
      next: (response) => {
        this.alertService.success("Check In successfully!");
        this.dialog.closeAll();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.alertService.error("Check In Failed!");
      },
    });
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  close(answer: string) {
    this.dialog.closeAll();
  }
}
