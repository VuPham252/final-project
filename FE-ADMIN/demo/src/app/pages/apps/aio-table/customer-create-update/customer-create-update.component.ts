import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { RoomTypeData } from 'src/app/core/api/room-type/room-type-data';
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
              private aleart :AlertService) {
  }

  ngOnInit() {
    // debugger;
    if (this.defaults && this.defaults.isView == 'view'){
      this.isView = this.defaults.isView;
      this.form = this.fb.group({
        id: this.defaults.customer.id,
        typeName: [this.defaults.customer.typeName, [Validators.required]],
        price: [this.defaults.customer.price, [Validators.required]]
        //this.defaults.typeName
      });
    }
    else if (this.defaults && this.defaults.isView != 'view') {
      this.mode = 'update';
      this.form = this.fb.group({
        id: null,
        typeName: [this.defaults.typeName, [Validators.required]],
        price: [this.defaults.price, [Validators.required]]
        //this.defaults.typeName
      });
    } else {
      this.defaults = {} as Customer;
      this.form = this.fb.group({
        id: null,
        typeName: [null, [Validators.required]],
        price: [null, [Validators.required]]
        //this.defaults.typeName
      });
    }


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
    const customer = this.form.value;
    customer.id = this.defaults.id;
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
