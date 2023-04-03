import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypeApi } from './api/room-type/room-type.api';
import { RoomTypeData } from './api/room-type/room-type-data';
import { RoomTypeService } from './api/room-type/room-type.service';
import { BaseModule } from '../base/base.module';
import { RegisterApi } from './api/register/register.api';
import { RegisterData } from './api/register/register-data';
import { RegisterService } from './api/register/register.service';
import { LoginApi } from './api/login/login.api';
import { LoginData } from './api/login/login-data';
import { LoginService } from './api/login/login.service';

const API = [
  RoomTypeApi,
  RegisterApi,
  LoginApi,
];

const SERVICES = [
  { provide: RoomTypeData, useClass: RoomTypeService },
  { provide: RegisterData, useClass: RegisterService },
  { provide: LoginData, useClass: LoginService },
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
