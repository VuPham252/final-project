import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  // providers: [ShareService],
})
export class ShareModule {
  static forRoot(): ModuleWithProviders<ShareModule> {
    return {
      ngModule: ShareModule,
      providers: [ShareService],
    };
  }
}
