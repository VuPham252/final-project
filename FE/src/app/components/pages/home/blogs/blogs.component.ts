import { Component, OnInit } from '@angular/core';
import { BlogHelperService } from 'src/app/components/helper/blog/blog-helper.service';
import { BlogData } from 'src/app/core/api/blog/blog-data';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  public blogList: any[] = [];

  constructor(
    private blogData: BlogData,
  ) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.blogData.search().subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.blogList = res;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    cssEase: 'linear',
    responsive: [{
      breakpoint: 992,
      settings: {
        arrows: true,
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1
      }
    }, {
      breakpoint: 576,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1
      }
    }]
  };
}
