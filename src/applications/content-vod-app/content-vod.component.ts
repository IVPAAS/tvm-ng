import { Component } from '@angular/core';

import { AssetsStore } from './assets/assets-store/assets-store.service';

@Component({
    selector: 'kAssets',
    templateUrl: './content-vod.component.html',
    styleUrls: ['./content-vod.component.scss'],
    providers : [AssetsStore]
})
export class ContentAssetsComponent  {



}

