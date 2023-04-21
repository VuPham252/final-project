import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderBookingComponent } from './order-booking.component';

const routes: VexRoutes = [
  {
    path: '',
    children: [
      // { path: '', component: RoomComponent },
      // { path: 'create', component: RoomCreateUpdateComponent },
      // { path: 'edit/:id', component: RoomCreateUpdateComponent },
    ]
  }
];

@NgModule({
  declarations: [
    OrderBookingComponent,
    ],

  imports: [
    CommonModule,
    //theme]
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatDialogModule,

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, QuicklinkModule]
})

export class OrderBookingModule { }
