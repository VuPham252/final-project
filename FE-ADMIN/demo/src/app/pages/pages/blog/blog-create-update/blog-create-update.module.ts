import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { MtxSelectModule } from "@ng-matero/extensions/select";
import { MatDialogModule } from '@angular/material/dialog';
import { BlogCreateUpdateComponent } from './blog-create-update.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MtxSelectModule,
  ],
  declarations: [BlogCreateUpdateComponent],
  exports: [BlogCreateUpdateComponent]
})
export class BlogCreateUpdateModule { }
