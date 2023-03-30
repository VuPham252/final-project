import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';

const PROVIDERS = [
  HttpService,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ...PROVIDERS,
      ]
    }
  }
}
