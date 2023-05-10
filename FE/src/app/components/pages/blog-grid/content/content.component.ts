import { Component, OnInit } from '@angular/core';
import { BlogHelperService } from 'src/app/components/helper/blog/blog-helper.service';
import { BlogData } from 'src/app/core/api/blog/blog-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  blogList: any[] = [];
  pageSize = 25;
  page = 1;

  constructor(private blogData: BlogData) {

  }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.blogData.search().subscribe({
      next: (res) => {
        console.log(res);
        this.blogList = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
