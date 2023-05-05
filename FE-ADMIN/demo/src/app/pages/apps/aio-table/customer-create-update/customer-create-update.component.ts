import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import { AlertService } from 'src/app/_services/alert.service';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
import { UploadData } from 'src/app/core/api/upload/upload-data';
@Component({
  selector: 'vex-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  // static id = 100;
  // id!: number;
  // form: UntypedFormGroup;
  // isCreateMode!: boolean;
  submitted = false;

  uploadState: boolean = true;

  @Input() isView: string;

  // constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  //             private fb: UntypedFormBuilder,
  //             private alertService: AlertService,
  //             private route: ActivatedRoute,
  //             private router: Router,
  //             private roomType :RoomTypeData) {
  // }

  // ngOnInit() {
  //   this.id = this.route.snapshot.params['id'];
  //   this.isCreateMode = !this.id;

  //   this.form = this.fb.group({
  //     id: null,
  //     typeName: null,
  //     price: null
  //   });

  //   if (!this.isCreateMode) {
  //     this.roomType.getById(this.id)
  //       .subscribe(x => this.form.patchValue(x));
  //   }
  // }

  get f() { return this.form.controls; }

  onSubmit() {


  }
  static id = 100;

  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: UntypedFormBuilder, private roomType :RoomTypeData,
              private aleart :AlertService, private uploadData: UploadData) {
  }

  ngOnInit() {
    // debugger;
    if (this.defaults && this.defaults.isView == 'view'){
      this.isView = this.defaults.isView;
      this.form = this.fb.group({
        id: this.defaults.customer.id,
        typeName: [this.defaults.customer.typeName, [Validators.required]],
        price: [this.defaults.customer.price, [Validators.required]],
        description: [this.defaults.customer.description, []],
        shortDescription: [this.defaults.customer.shortDescription, []],
        imgCodeList: this.fb.array([]),
        imgResponseList: this.fb.array(this.defaults.customer.imgResponseList),
        deleteImgCodeList: this.fb.array([]),
        //this.defaults.typeName
      });
      console.log(this.form);

    }
    else if (this.defaults && this.defaults.isView != 'view') {
      this.mode = 'update';
      this.form = this.fb.group({
        id: this.defaults.id,
        typeName: [this.defaults.typeName, [Validators.required]],
        price: [this.defaults.price, [Validators.required]],
        description: [this.defaults.description, []],
        shortDescription: [this.defaults.shortDescription, []],
        imgCodeList: this.fb.array([]),
        imgResponseList: this.fb.array(this.defaults.imgResponseList),
        deleteImgCodeList: this.fb.array([]),
        //this.defaults.typeName
      });
      console.log(this.form);
    } else {
      this.defaults = {} as Customer;
      this.form = this.fb.group({
        id: 0,
        typeName: ['', [Validators.required]],
        price: [, [Validators.required]],
        description: ['', []],
        shortDescription: ['', []],
        imgCodeList: this.fb.array([]),
        imgResponseList: this.fb.array([]),
        deleteImgCodeList: this.fb.array([]),
        //this.defaults.typeName
      });
    }
  }

  get imgCodeList() {
    return this.form.get('imgCodeList') as FormArray;
  }

  get imgResponseList() {
    return this.form.get('imgResponseList') as FormArray;
  }

  get deleteImgCodeList() {
    return this.form.get('deleteImgCodeList') as FormArray;
  }

  uploadFile(event: any) {
    this.uploadState = false;
    let item = event.files;
    const formData = new FormData();
    for(let i = 0; i < item.length; i++) {
      formData.append("file", item[i]);
    }
    if(item.length > 0) {
      this.uploadData.save(formData).subscribe({
        next: (res) => {
          this.uploadState = true;
          for(let i = 0; i < item.length; i++) {
            const file = this.form.get('imgCodeList') as FormArray;
            file.push(this.fb.control(res[i].fileCode));
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  deleteImg(index: number) {
    let img = this.imgResponseList.value[index];
    this.imgResponseList.removeAt(index);
    this.deleteImgCodeList.push(this.fb.control(img.fileCode));
  }

  save() {
    this.submitted = true;
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.form.value;
    this.submitted = true;
    if (this.form.invalid)
      return;
    // debugger
    this.roomType.save(customer).subscribe({
      next: () => {
        this.aleart.success("Add new success");
        this.dialogRef.close(customer);
      },
      error: (error) => {
        this.aleart.error("Add new fail");
        console.log(error)
      }
    })
  }

  updateCustomer() {
    // debugger
    const customer = this.form.value;
    customer.id = this.defaults.id;
    delete customer.imgResponseList;
    this.submitted = true;
    if (this.form.invalid)
      return;

    this.roomType.update(customer.id, customer).subscribe({
      next: () => {
        this.aleart.success("Update success");
        this.dialogRef.close(customer);
      },
      error: (error) => {
        this.aleart.error("Update fail");
        console.log(error)
      }
    })
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
