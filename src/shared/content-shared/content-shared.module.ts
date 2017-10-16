import { KalturaCommonModule } from '@kaltura-ng/kaltura-common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAssetTypePipe } from "./pipes/media-asset-type.pipe";
import { TemplateTypePipe } from "./pipes/template-type.pipe";

@NgModule({
  imports: [    
    //KalturaCommonModule,
    CommonModule    
  ],
  declarations: [
    MediaAssetTypePipe,
    TemplateTypePipe    
  ],
  exports: [
    MediaAssetTypePipe,
    TemplateTypePipe
  ],
  providers: [    
  ]
})
export class ContentSharedModule {
}
