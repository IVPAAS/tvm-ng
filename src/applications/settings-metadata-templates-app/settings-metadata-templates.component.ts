import { MediaAssetsTypesService } from './media-assets-types/media-assets-types.service';
import {Component} from '@angular/core';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';


@Component({
    selector: 'kSettingsMetadataTemplates',
    templateUrl: './settings-metadata-templates.component.html',
    styleUrls: ['./settings-metadata-templates.component.scss'],
    providers: [MediaAssetsTypesService]
  })
  export class SettingsMetadataTemplatesComponent{
  }