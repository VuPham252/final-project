import { Component, Inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogData } from "src/app/core/api/blog/blog-data";
import { Blog } from "src/app/core/model/blog";
import { AlertService } from "src/app/_services/alert.service";
import { UploadData } from "src/app/core/api/upload/upload-data";
@Component({
  selector: "vex-blog-create-update",
  templateUrl: "./blog-create-update.component.html",
  styleUrls: [
    "./blog-create-update.component.scss",
    "../../../../../../node_modules/quill/dist/quill.snow.css",
    "../../../../../@vex/styles/partials/plugins/quill/_quill.scss"
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BlogCreateUpdateComponent implements OnInit {
  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  uploadState: boolean = true;
  @Input() isView: string;



  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private dialog: MatDialogRef<BlogCreateUpdateComponent>,
    private blogData: BlogData,
    private uploadData: UploadData
  ) {

  }
  htmlText ="<p>Testing</p>"
  hasFocus = false;
  subject: string;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]


  ngOnInit(): void {
    this.dialog.updateSize('650px', 'auto');
    console.log(this.defaults);
    if (this.defaults && this.defaults.isView == "view") {
      this.isView = this.defaults.isView;
      this.form = this.fb.group({
        id: this.defaults.customer.id,
        deleteImgCodeList: this.fb.array([]),
        title: [this.defaults.customer.title, [Validators.required]],
        shortDescription: [this.defaults.customer.shortDescription, []],
        author: [this.defaults.customer.author, [Validators.required]],
        imgCodeList: this.fb.array([]),
        imgResponse: this.fb.array([this.defaults.customer.imgResponse]),
        description: [this.defaults.customer.description, []],
      });
    } else if (this.defaults && this.defaults.isView != "view") {
      this.isCreateMode = false;
      this.form = this.fb.group({
        id: this.defaults.id,
        title: [this.defaults.title, [Validators.required]],
        shortDescription: [this.defaults.shortDescription, []],
        description: [this.defaults.description, []],
        author: [this.defaults.author, [Validators.required]],
        imgCodeList: this.fb.array([]),
        imgResponse: this.fb.array([this.defaults.imgResponse]),
        deleteImgCodeList: this.fb.array([]),
      });
    } else {
      this.isCreateMode = true;
      this.defaults = {} as Blog;
      this.form = this.fb.group({
        id: 0,
        title: ["", [Validators.required]],
        shortDescription: ["", []],
        description: ["", []],
        author: ["", [Validators.required]],
        imgCodeList: this.fb.array([]),
        imgResponse: this.fb.array([]),
        deleteImgCodeList: this.fb.array([]),
      });
    }
  }

  onSubmit() {
    console.log("submit");
    this.submitted = true;
    if (this.form.invalid) return;

    const blog = this.form.value;
    debugger;
    if (this.isCreateMode) {
      this.blogData.save(blog).subscribe({
        next: (response) => {
          this.alertService.success(
            this.isCreateMode ? "Create Successful!" : "Update Successful"
          );
          this.dialog.close(response);
        },
        error: (error) => {
          console.log(error);
          this.alertService.error(
            this.isCreateMode ? "Create Failed!" : "Update Failed"
          );
        },
      });
    } else {
      blog.id = this.defaults.id;
      this.blogData.update(blog.id, blog).subscribe({
        next: (response) => {
          this.alertService.success(
            this.isCreateMode ? "Create Successful!" : "Update Successful"
          );
          this.dialog.close(response);
        },
        error: (error) => {
          console.log(error);
          this.alertService.error(
            this.isCreateMode ? "Create Failed!" : "Update Failed"
          );
        },
      });
    }
  }

  get imgCodeList() {
    return this.form.get("imgCodeList") as FormArray;
  }

  get imgResponse() {
    return this.form.get("imgResponse") as FormArray;
  }

  get deleteImgCodeList() {
    return this.form.get("deleteImgCodeList") as FormArray;
  }

  uploadFile(event: any) {
    this.uploadState = false;
    let item = event.files;
    const formData = new FormData();
    for (let i = 0; i < item.length; i++) {
      formData.append("file", item[i]);
    }
    if (item.length > 0) {
      if (this.imgResponse.value.length > 0) {
        let a = this.imgResponse.value[0].fileCode;
        this.deleteImgCodeList.push(this.fb.control(a));
      }
      this.uploadData.save(formData).subscribe({
        next: (res) => {
          this.uploadState = true;
          for (let i = 0; i < item.length; i++) {
            const file = this.form.get("imgCodeList") as FormArray;
            file.push(this.fb.control(res[i].fileCode));
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // deleteImg(index: number) {
  //   let img = this.imgResponse.value[index];
  //   this.imgResponse.removeAt(index);
  //   this.deleteImgCodeList.push(this.fb.control(img.fileCode));
  // }

  onNoClick() {
    this.dialog.close();
  }

  close(answer: string) {
    this.dialog.close();
  }

  get f() {
    return this.form.controls;
  }
}
