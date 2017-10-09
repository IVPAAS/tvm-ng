import {Component} from '@angular/core';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';


@Component({
    selector: 'kSettingsTemplatesAssets',
    templateUrl: './settings-metadata-templates.component.html',
    styleUrls: ['./settings-metadata-templates.component.scss']
  })
  export class SettingsTemplatesAssetsComponent{
    public _isBusy = false    
    public isSafari: boolean = false;
    public _blockerMessage: AreaBlockerMessage = null;   
    

  }