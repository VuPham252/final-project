import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelHelperService } from 'src/app/components/helper/hotel/hotel-helper.service';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public roomTypeList: any[] = [];

  constructor(private roomTypeData: RoomTypeData) {}

  ngOnInit(): void {
    this.getRoomType();
  }

  getRoomType() {
    this.roomTypeData.search().subscribe({
      next: (res) => {
        if(res) {
          console.log(res);
          this.roomTypeList = res;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
