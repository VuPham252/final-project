import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css'],
})
export class HotelBookingComponent implements OnInit {
  public bookingForm!: FormGroup;
  public roomTypeList: any[] = [];

  constructor(private fb: FormBuilder, private roomTypeData: RoomTypeData) {}

  get name() {
    return this.bookingForm.get('name');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get phone() {
    return this.bookingForm.get('phone');
  }

  get bookingRequestList() {
    return this.bookingForm.get('bookingRequestList') as FormArray;
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      bookingRequestList: this.fb.array([
        this.fb.group({
          checkin: ['', [Validators.required]],
          checkout: ['', [Validators.required]],
          quantity: ['', [Validators.required]],
          roomType: [0, [Validators.required]],
        }),
      ]),
    });
    this.getRoomType();
  }

  getRoomType() {
    this.roomTypeData.search().subscribe({
      next: (res) => {
        this.roomTypeList = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  test() {
    let test = this.fb.group({
      checkin: ['', [Validators.required]],
      checkout: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      roomType: [0, [Validators.required]],
    })
    this.bookingRequestList.push(test);
  }

  onSubmit() {
    console.log(this.bookingForm.value);
    this.bookingForm.reset();
  }
}
