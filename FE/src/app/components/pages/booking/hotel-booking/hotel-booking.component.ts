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
  public availableRoom: any[] = [];

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
      bookingRequestList: this.fb.array([
        this.fb.group({
          inputCheckinDate: ['', [Validators.required]],
          inputCheckoutDate: ['', [Validators.required]],
          amount: ['', [Validators.required]],
          roomTypeId: ['', [Validators.required]],
        }),
      ]),
    });
    this.getRoomType();

  }

  onChangeAva(index: number) {
    debugger;
    let checkin = this.element.nativeElement.querySelectorAll('.checkIn');
    let checkout = this.element.nativeElement.querySelectorAll('.checkOut');
    let roomtype = this.element.nativeElement.querySelectorAll('select.roomType');
    if (
      checkin[index].value.length > 0 &&
      checkout[index].value.length > 0 &&
      roomtype[index].value != undefined &&
      roomtype[index].value != null
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
            this.isAvailable = true;
            this.availableRoom.push(res);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteFormGroup(index: number) {
    this.bookingRequestList.removeAt(index);
  }

  getRoomType() {
    this.roomTypeData.search().subscribe({
      next: (res) => {
        this.roomTypeList = res;
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
    });
    this.bookingRequestList.push(newForm);
  }

  onSubmit() {
    let item: Booking = this.bookingForm.value;
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
