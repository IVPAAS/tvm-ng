import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTreeModule } from '@kaltura-ng/kaltura-primeng-ui/prime-tree';
import { AreaBlockerModule, KalturaUIModule, TooltipModule } from '@kaltura-ng/kaltura-ui';
import {
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  RadioButtonModule,
  TreeModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KalturaCommonModule } from '@kaltura-ng/kaltura-common';
import { AutoCompleteModule, KalturaPrimeNgUIModule } from '@kaltura-ng/kaltura-primeng-ui';
import { PopupWidgetModule } from '@kaltura-ng/kaltura-ui/popup-widget';

import { TagsModule } from '@kaltura-ng/kaltura-ui/tags';
import { MediaAssetTypePipe } from "app-shared/content-shared/pipes/media-asset-type.pipe";

@NgModule({
  imports: [
    AreaBlockerModule,
    TooltipModule,
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    PrimeTreeModule,
    KalturaCommonModule,
    KalturaPrimeNgUIModule,
    KalturaUIModule,
    ButtonModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    PopupWidgetModule,
    DataTableModule,
    MenuModule,
    TagsModule,
    PaginatorModule,
    InputTextModule
  ],
  declarations: [
    MediaAssetTypePipe    
  ],
  exports: [
    MediaAssetTypePipe
  ],
  providers: [    
  ]
})
export class ContentSharedModule {
}
