import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { BlogGridRoutingModule } from './blog-grid-routing.module';
import { BlogGridComponent } from './blog-grid.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ShareModule } from "../../../share/share.module";


@NgModule({
    declarations: [
        BlogGridComponent,
        ContentComponent
    ],
    imports: [
        CommonModule,
        BlogGridRoutingModule,
        SharedModule,
        NgbModule,
        NgxPaginationModule,
        ShareModule
    ]
})
export class BlogGridModule { }
