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
import { RoomComponent } from './room.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { RoomCreateUpdateComponent } from './room-create-update/room-create-update.component';
import { RoomCreateUpdateModule } from './room-create-update/room-create-update.module';
import { MatDialogModule } from '@angular/material/dialog';
const routes: VexRoutes = [
  {
    path: '',
    children: [
      { path: '', component: RoomComponent },
      { path: 'create', component: RoomCreateUpdateComponent },
      { path: 'edit/:id', component: RoomCreateUpdateComponent },
      { path: 'view/:id', component: RoomCreateUpdateComponent,  data: { isView: true}},
    ]
  }
];
@NgModule({
  declarations: [
    RoomComponent,
    ],

  imports: [
    CommonModule,
    RoomCreateUpdateModule,
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

export class RoomModule { }
