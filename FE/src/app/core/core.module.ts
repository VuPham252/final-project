import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeApi } from './api/room-type/room-type.api';
import { RoomTypeData } from './api/room-type/room-type-data';
import { RoomTypeService } from './api/room-type/room-type.service';
import { BaseModule } from '../base/base.module';

const API = [
  RoomTypeApi
];

const SERVICES = [
  { provide: RoomTypeData, useClass: RoomTypeService },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BaseModule.forRoot()],
  exports: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...API, ...SERVICES],
    };
  }
}
