import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { SafeHtml } from './pipe/test.pipe';

@NgModule({
  declarations: [SafeHtml],
  imports: [CommonModule],
  exports: [SafeHtml],
  providers: [ShareService],
})
export class ShareModule {
  static forRoot(): ModuleWithProviders<ShareModule> {
    return {
      ngModule: ShareModule,
      providers: [ShareService],
    };
  }
}
