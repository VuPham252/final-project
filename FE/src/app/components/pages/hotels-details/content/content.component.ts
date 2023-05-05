import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelHelperService } from 'src/app/components/helper/hotel/hotel-helper.service';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { roomType } from 'src/app/core/model/room-type';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  fake: any;
  roomTypeDetail: any

  constructor(private roomTypeData: RoomTypeData, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getById();
  }

  getById() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.roomTypeData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.roomTypeDetail = res;
      }
    })
  }

  settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    cssEase: 'linear',
    asNavFor: '.detail-slider-nav'
  };
  settingsThumb = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    cssEase: 'linear',
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    asNavFor: '.detail-slider-for',
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 3
      }
    }]
  };
  settingsTesti = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    arrows: false,
    dots: false,
    cssEase: 'linear',
  };
}
