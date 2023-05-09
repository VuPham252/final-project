import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/_services/alert.service';
import { ContactData } from 'src/app/core/api/contact/contact-data';
import { Contact } from 'src/app/core/model/contact';

@Component({
  selector: 'vex-contact-create-update',
  templateUrl: './contact-create-update.component.html',
  styleUrls: ['./contact-create-update.component.scss']
})
export class ContactCreateUpdateComponent implements OnInit {

  id!: number;
  form: UntypedFormGroup;
  isCreateMode!: boolean;
  submitted = false;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  listContact: Contact[] = [];
  isView: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private contactData : ContactData,
    private dialog: MatDialog,
    ) { }

    get f() { return this.form.controls; }
    ngOnInit(): void {
      // debugger
      this.form = this.fb.group({
        id: 0,
        name: [ '', [Validators.required]],
        email: [ '', [Validators.required]],
        phone: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        message: ['', [Validators.required]],
      })
      this.contactData.search().subscribe((x: Array<Contact>) => this.listContact = x || []);
      this.isView = this.defaults.isView;
      this.form.setValue(this.defaults.customer);
    }

    onNoClick() {
      this.dialog.closeAll()
    }

    close(answer: string) {
      this.dialog.closeAll();
    }

}
