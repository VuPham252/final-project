import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogData } from 'src/app/core/api/blog/blog-data';
import { Blog } from 'src/app/core/model/blog';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'vex-blog-create-update',
  templateUrl: './blog-create-update.component.html',
  styleUrls: ['./blog-create-update.component.scss']
})
export class BlogCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  @Input() isView: string;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private dialog: MatDialog,
    private blogData: BlogData
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      deleteImgCodeList: [[],[]],
      title: [ '', [Validators.required]],
      shortDecription: [ '', [Validators.required]],
      author: ['', [Validators.required]],
      imgCodeList: [[],[]],
      description: ['', [Validators.required]],
    })
      if (this.defaults && this.defaults.isView == 'view'){
        this.isView = this.defaults.isView;
        this.form.setValue ( this.defaults.roomData);
      }
      else if (this.defaults) {
        this.isCreateMode = false;
        this.form.setValue(
          this.defaults
        ) ;
      } else {
        this.isCreateMode = true;
        this.defaults = {} as Blog;

      }
  }

  onSubmit() {
    console.log("submit")
    this.submitted = true;
    if (this.form.invalid)
      return;

    const blog = this.form.value;

    if(this.isCreateMode){
      this.blogData.save(blog)
      .subscribe({
        next: (response) => {
          this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
          this.dialog.closeAll()
        },
        error: (error) => {
          console.log(error)
          this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
        }
      })
    }else{
      blog.id =  this.defaults.id;
      this.blogData.update(blog.id, blog)
      .subscribe({
        next: (response) => {
          this.alertService.success(this.isCreateMode ? "Create Successful!" : "Update Successful");
          this.dialog.closeAll()
        },
        error: (error) => {
          console.log(error)
          this.alertService.error(this.isCreateMode ? "Create Failed!" : "Update Failed");
        }
      })
    }


  }

  onNoClick() {
    this.dialog.closeAll()
  }

  close(answer: string) {
    this.dialog.closeAll();
  }


  get f() { return this.form.controls; }
}
