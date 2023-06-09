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
import { ContactData } from './api/contact/contact-data';
import { ContactService } from './api/contact/contact.service';
import { ContactApi } from './api/contact/contact.api';
import { UploadApi } from './api/upload/upload.api';
import { UploadData } from './api/upload/upload-data';
import { UploadService } from './api/upload/upload.service';
import { BookingData } from './api/booking/booking-data';
import { BookingService } from './api/booking/booking.service';
import { BookingApi } from './api/booking/booking.api';
import { OrderApi } from './api/order/order.api';
import { OrderData } from './api/order/order-data';
import { OrderService } from './api/order/order.service';
import { CheckInApi } from './api/check-in/check-in.api';
import { CheckInData } from './api/check-in/check-in-data';
import { CheckInService } from './api/check-in/check-in.service';
import { CheckOutApi } from './api/check-out/check-out.api';
import { CheckOutData } from './api/check-out/check-out-data';
import { CheckOutService } from './api/check-out/check-out.service';
import { BlogApi } from './api/blog/blog.api';
import { BlogData } from './api/blog/blog-data';
import { BlogService } from './api/blog/blog.service';

const API = [RoomTypeApi, RoomApi , RegisterApi, LoginApi, ContactApi, UploadApi, BookingApi, OrderApi, CheckInApi, CheckOutApi, BlogApi];

const SERVICES = [
  { provide: RoomTypeData, useClass: RoomTypeService },
  { provide: RoomData, useClass: RoomService },
  { provide: RegisterData, useClass: RegisterService },
  { provide: BlogData, useClass: BlogService },
  { provide: LoginData, useClass: LoginService },
  { provide: ContactData, useClass: ContactService },
  { provide: UploadData, useClass: UploadService },
  { provide: BookingData, useClass: BookingService },
  { provide: OrderData, useClass: OrderService },
  { provide: CheckInData, useClass: CheckInService },
  { provide: CheckOutData, useClass: CheckOutService },
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
