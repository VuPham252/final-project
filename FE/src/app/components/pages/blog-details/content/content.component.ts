import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogHelperService } from 'src/app/components/helper/blog/blog-helper.service';
import { BlogData } from 'src/app/core/api/blog/blog-data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  blogDetail: any;

  constructor(private blogData: BlogData, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.blogData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.blogDetail = res;
      }
    })
  }

}
