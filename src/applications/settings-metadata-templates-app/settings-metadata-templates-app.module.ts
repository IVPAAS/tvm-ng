import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMetadataTemplatesComponent } from './settings-metadata-templates.component';
import { routing } from "./settings-metadata-templates-app.routes";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AreaBlockerModule } from "@kaltura-ng/kaltura-ui";
import { TranslateModule } from "ng2-translate";
import { MediaAssetsTypesComponentsList } from "./media-assets-types/media-assets-types-components-list";
import { TreeModule, TieredMenuModule, SharedModule, AccordionModule, ButtonModule, InputTextareaModule, PaginatorModule, InputTextModule, MenuModule, DataTableModule, DropdownModule, RadioButtonModule, MultiSelectModule, CheckboxModule, CalendarModule, SpinnerModule, ConfirmDialogModule } from 'primeng/primeng';
import { KalturaUIModule, TooltipModule } from '@kaltura-ng/kaltura-ui';
import { PopupWidgetModule } from '@kaltura-ng/kaltura-ui/popup-widget';
import { KMCShellModule } from 'app-shared/mc-shell';
import { KalturaPrimeNgUIModule } from '@kaltura-ng/kaltura-primeng-ui';
import { ContentSharedModule } from "app-shared/content-shared/content-shared.module";
import { MediaAssetsTypeComponentsList } from "./media-assets-type/media-asset-type-components-list";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DropdownModule,
    AreaBlockerModule,
    TranslateModule,
    AccordionModule,
    AreaBlockerModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    DataTableModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    KalturaPrimeNgUIModule,
    KalturaUIModule,
    KMCShellModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PopupWidgetModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routing),
    SharedModule,
    SpinnerModule,
    TieredMenuModule,
    TooltipModule,
    ContentSharedModule
  ],
  declarations: [SettingsMetadataTemplatesComponent,
    MediaAssetsTypesComponentsList,
    MediaAssetsTypeComponentsList]
})
export class SettingsMetadataTemplatesAppModule {
}
