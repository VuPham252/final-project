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

@Component({
  selector: "vex-order-booking-create-update",
  templateUrl: "./order-booking-create-update.component.html",
  styleUrls: ["./order-booking-create-update.component.scss"],
})
export class OrderBookingCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  listRoomType: any[] = [];
  listRoom: Room[] = [];

  @Input() isView: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private element: ElementRef,
    private roomData: RoomData,
    private dialog: MatDialog,
    private roomTypeData: RoomTypeData,
    private bookingData: BookingData
  ) {}
  get f() {
    return this.form.controls;
  }

  get customerName() {
    return this.form.get("customerName");
  }

  get email() {
    return this.form.get("email");
  }

  get phoneNumber() {
    return this.form.get("phoneNumber");
  }

  get bookingRequestList() {
    return this.form.get("bookingRequestList") as FormArray;
  }

  ngOnInit(): void {
    this.getRoomType();
    this.form = this.fb.group({
      customerName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      bookingRequestList: this.fb.array(
        [
          this.fb.group({
            inputCheckinDate: ["", [Validators.required]],
            inputCheckoutDate: ["", [Validators.required]],
            amount: ["", [Validators.required, Validators.max, Validators.min]],
            roomTypeId: ["", [Validators.required]],
            roomTypeName: ["", []],
            roomTypePrice: ["", []],
            isAvailable: [false, []],
            availableRoom: [99, []],
          }),
        ],
        [Validators.required]
      ),
    });
    // this.route.data.subscribe(e => {
    //   this.isView = e?.isView;
    // })
    // this.id = this.route.snapshot.params['id'];
    // this.isCreateMode = !this.id;
    // this.roomType.search().subscribe((x: Array<roomType>) => this.listRoomType = x || []);

    if (this.defaults && this.defaults.isView == "view") {
      this.isView = this.defaults.isView;
      this.form.setValue(this.defaults.roomData);
    }
    this.roomData
      .search()
      .subscribe((x: Array<Room>) => (this.listRoom = x || []));

    console.log(this.defaults);
    console.log(this.isView);
    if (this.defaults) {
      this.isCreateMode = false;
      this.form.setValue(this.defaults);
    } else {
      this.isCreateMode = true;
      this.defaults = {} as Room;
    }
  }

  formatDate(date: any) {
    let dateValue = new Date(date);
    let dateValueDay = dateValue.getDate().toString();
    let dateValueMonth = (dateValue.getMonth() + 1).toString();
    let dateValueYear = dateValue.getFullYear().toString();

    if (dateValueDay.length < 2) {
      dateValueDay = "0" + dateValueDay;
    }
    if (dateValueMonth.length < 2) {
      dateValueMonth = "0" + dateValueMonth;
    }

    return dateValueYear + '-' + dateValueMonth + '-' + dateValueDay;
  }

  onChangeAva(index: number) {
    this.bookingRequestList;
    let checkin = this.element.nativeElement.querySelectorAll(".checkIn");
    let checkout = this.element.nativeElement.querySelectorAll(".checkOut");
    let roomtype =
      this.element.nativeElement.querySelectorAll("select.roomType");
    this.listRoomType.forEach((element) => {
      if (element.formId == index) {
        element.used = false;
        element.formId = null;
      }
      if (element.id == roomtype[index].value) {
        element.used = true;
        element.formId = index;
      }
    });
    if (
      checkin[index].value.length > 0 &&
      checkout[index].value.length > 0 &&
      roomtype[index].value.length > 0
    ) {
      // debugger;
      // let dateFormat = require('date-format');
      // let checkIn = new Date(checkin[index].value);
      // let checkInDate = checkIn.getDate().toString();
      // let checkInMonth = (checkIn.getMonth() + 1).toString();
      // let checkInYear = checkIn.getFullYear().toString();

      // if (checkInDate.length < 2) {
      //   checkInDate = "0" + checkInDate;
      // }
      // if (checkInMonth.length < 2) {
      //   checkInMonth = "0" + checkInMonth;
      // }

      // let checkOut = new Date(checkout[index].value);
      // let checkOutDate = checkOut.getDate().toString();
      // let checkOutMonth = (checkOut.getMonth() + 1).toString();
      // let checkOutYear = checkOut.getFullYear().toString();

      // if (checkOutDate.length < 2) {
      //   checkOutDate = "0" + checkOutDate;
      // }
      // if (checkOutMonth.length < 2) {
      //   checkOutMonth = "0" + checkOutMonth;
      // }

      let item = {
        inputCheckinDate: this.formatDate(checkin[index].value),
        inputCheckoutDate: this.formatDate(checkout[index].value),
        roomTypeId: parseInt(roomtype[index].value),
      };
      this.bookingData.checkAva(item).subscribe({
        next: (res) => {
          console.log(res);
          if (res > 0) {
            this.bookingRequestList.controls[index]
              .get("isAvailable")
              .setValue(true);
            this.bookingRequestList.controls[index]
              .get("availableRoom")
              .setValue(res);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  test(index: number) {
    this.listRoomType.forEach((element) => {
      if (element.formId == index) {
        element.used = false;
        element.formId = null;
      }
    });
  }

  deleteFormGroup(index: number) {
    this.bookingRequestList.removeAt(index);
  }

  getRoomType() {
    this.roomTypeData.search().subscribe({
      next: (res) => {
        this.listRoomType = res;
        this.listRoomType.forEach((element) => {
          element.used = false;
          element.formId = null;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addNewForm() {
    let newForm = this.fb.group({
      inputCheckinDate: ["", [Validators.required]],
      inputCheckoutDate: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      roomTypeId: ["", [Validators.required]],
      roomTypeName: ["", []],
      roomTypePrice: ["", []],
      isAvailable: [false, []],
      availableRoom: [99, []],
    });
    this.bookingRequestList.push(newForm);
  }

  onSubmit() {
    let item: Booking = this.form.value;
    let arr = item.bookingRequestList;
    for (let i = 0; i < arr.length; i++) {
      let obj = this.listRoomType.find((o) => o.id == arr[i].roomTypeId);
      if (obj != null && obj != undefined) {
        arr[i].roomTypeName = obj.typeName;
        arr[i].roomTypePrice = obj.price;
      }
      arr[i].inputCheckinDate = this.formatDate(arr[i].inputCheckinDate);
      arr[i].inputCheckoutDate = this.formatDate(arr[i].inputCheckoutDate);
    }
    item.bookingRequestList = arr;
    // debugger;
    this.bookingData.booking(item).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.success(
          this.isCreateMode ? "Create Successful!" : "Update Successful"
        );
        this.dialog.closeAll();
      },
      error: (err) => {
        console.log(err);
        this.alertService.error(
          this.isCreateMode ? "Create Failed!" : "Update Failed"
        );
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
