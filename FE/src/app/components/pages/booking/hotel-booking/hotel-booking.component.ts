import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BookingData } from 'src/app/core/api/ava-room/booking-data';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { Booking } from 'src/app/core/model/booking';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css'],
})
export class HotelBookingComponent implements OnInit {
  public bookingForm!: FormGroup;
  public roomTypeList: any[] = [];

  public isAvailable: boolean = false;
  public availableRoom: number = 0;

  constructor(
    private fb: FormBuilder,
    private roomTypeData: RoomTypeData,
    private bookingData: BookingData,
    private element: ElementRef
  ) {}

  get customerName() {
    return this.bookingForm.get('customerName');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get phoneNumber() {
    return this.bookingForm.get('phoneNumber');
  }

  get bookingRequestList() {
    return this.bookingForm.get('bookingRequestList') as FormArray;
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      customerName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      bookingRequestList: this.fb.array(
        [
          this.fb.group({
            inputCheckinDate: ['', [Validators.required]],
            inputCheckoutDate: ['', [Validators.required]],
            amount: ['', [Validators.required, Validators.max, Validators.min]],
            roomTypeId: ['', [Validators.required]],
            isAvailable: [false, []],
            availableRoom: [0, []],
          }),
        ],
        [Validators.required]
      ),
    });
    this.getRoomType();
  }

  onChangeAva(index: number) {
    let checkin = this.element.nativeElement.querySelectorAll('.checkIn');
    let checkout = this.element.nativeElement.querySelectorAll('.checkOut');
    let roomtype =
      this.element.nativeElement.querySelectorAll('select.roomType');

    this.roomTypeList.forEach((element) => {
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
      let item = {
        inputCheckinDate: checkin[index].value,
        inputCheckoutDate: checkout[index].value,
        roomTypeId: parseInt(roomtype[index].value),
      };
      this.bookingData.checkAva(item).subscribe({
        next: (res) => {
          console.log(res);
          if (res > 0) {
            this.bookingRequestList.controls[index]
              .get('isAvailable')
              .setValue(true);
            this.bookingRequestList.controls[index]
              .get('availableRoom')
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
    this.roomTypeList.forEach((element) => {
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
        this.roomTypeList = res;
        this.roomTypeList.forEach((element) => {
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
      inputCheckinDate: ['', [Validators.required]],
      inputCheckoutDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      roomTypeId: ['', [Validators.required]],
      isAvailable: [false, []],
      availableRoom: [0, []],
    });
    this.bookingRequestList.push(newForm);
  }

  onSubmit() {
    let item: Booking = this.bookingForm.value;
    let arr = item.bookingRequestList;
    for (let i = 0; i < arr.length; i++) {
      let monthCheckIn = '';
      let dayCheckIn = '';
      let monthCheckOut = '';
      let dayCheckOut = '';

      if (parseInt(Object.values(arr[i].inputCheckinDate)[1]) < 10)
        monthCheckIn =
          '0' + parseInt(Object.values(arr[i].inputCheckinDate)[1]);
      else monthCheckIn = Object.values(arr[i].inputCheckinDate)[1];
      if (parseInt(Object.values(arr[i].inputCheckinDate)[2]) < 10)
        dayCheckIn = '0' + parseInt(Object.values(arr[i].inputCheckinDate)[2]);
      else dayCheckIn = Object.values(arr[i].inputCheckinDate)[2];

      if (parseInt(Object.values(arr[i].inputCheckoutDate)[1]) < 10)
        monthCheckOut =
          '0' + parseInt(Object.values(arr[i].inputCheckoutDate)[1]);
      else monthCheckOut = Object.values(arr[i].inputCheckoutDate)[1];
      if (parseInt(Object.values(arr[i].inputCheckoutDate)[2]) < 10)
        dayCheckOut =
          '0' + parseInt(Object.values(arr[i].inputCheckoutDate)[2]);
      else dayCheckOut = Object.values(arr[i].inputCheckoutDate)[2];

      arr[i].inputCheckinDate =
        parseInt(Object.values(arr[i].inputCheckinDate)[0]) +
        '-' +
        monthCheckIn +
        '-' +
        dayCheckIn;
      arr[i].inputCheckoutDate =
        parseInt(Object.values(arr[i].inputCheckoutDate)[0]) +
        '-' +
        monthCheckOut +
        '-' +
        dayCheckOut;
    }
    item.bookingRequestList = arr;
    this.bookingData.booking(item).subscribe({
      next: (res) => {
        console.log(res);
        this.bookingForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
