import { KalturaCommonModule } from '@kaltura-ng/kaltura-common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAssetTypePipe } from "./pipes/media-asset-type.pipe";
import { UtcDatePipe } from "./pipes/utc-date.pipe";

@NgModule({
  imports: [
    //KalturaCommonModule,
    CommonModule
  ],
  declarations: [
    MediaAssetTypePipe,
    UtcDatePipe
  ],
  exports: [
    MediaAssetTypePipe,
    UtcDatePipe
  ],
  providers: [
  ]
})
export class ContentSharedModule {
}
