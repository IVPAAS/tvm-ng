import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsMetadataTemplatesComponent} from './settings-metadata-templates.component';
import {routing} from "./settings-metadata-templates-app.routes";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, DropdownModule, InputTextModule} from "primeng/primeng";
import { AreaBlockerModule } from "@kaltura-ng/kaltura-ui";
import {TranslateModule} from "ng2-translate";
import { MediaAssetsTypesComponentsList } from "./media-assets-types/media-assets-types-components-list";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    AreaBlockerModule,    
    TranslateModule
  ],
  declarations: [SettingsMetadataTemplatesComponent,        
    MediaAssetsTypesComponentsList]
})
export class SettingsMetadataTemplatesAppModule {
}
