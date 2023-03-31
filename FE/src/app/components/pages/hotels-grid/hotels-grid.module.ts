import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiceSelectModule } from 'ng-nice-select';
import { NgxPaginationModule } from 'ngx-pagination';

import { HotelsGridRoutingModule } from './hotels-grid-routing.module';
import { HotelsGridComponent } from './hotels-grid.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    HotelsGridComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    HotelsGridRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NiceSelectModule,
    NgxPaginationModule,
    HttpClientModule,
    CoreModule.forRoot(),
  ]
})
export class HotelsGridModule { }
