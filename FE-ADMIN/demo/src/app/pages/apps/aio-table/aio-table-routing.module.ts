import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { AioTableComponent } from './aio-table.component';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';


const routes: VexRoutes = [
  {
    path: '',
    component: AioTableComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AioTableRoutingModule {
}
