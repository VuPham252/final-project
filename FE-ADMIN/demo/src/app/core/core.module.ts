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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from '../auth/interceptor/jwt-interceptor.service';
import { AuthInterceptorService } from '../auth/interceptor/auth-interceptor.service';
import { RoomService } from './api/room/room.service';
import { RoomData } from './api/room/room-data';
import { RoomApi } from './api/room/room.api';

const API = [RoomTypeApi, RoomApi , RegisterApi, LoginApi];

const SERVICES = [
  { provide: RoomTypeData, useClass: RoomTypeService },
  { provide: RoomData, useClass: RoomService },
  { provide: RegisterData, useClass: RegisterService },
  { provide: LoginData, useClass: LoginService },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BaseModule.forRoot()],
  exports: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...API, ...SERVICES],
    };
  }
}
