// import { KalturaMultiRequest } from 'kaltura-typescript-client';
// import { KalturaCategory } from 'kaltura-typescript-client/types/KalturaCategory';
import { Injectable } from '@angular/core';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';
import { FormManager } from '@kaltura-ng/kaltura-ui'
import { MediaAssetTypeService } from './media-asset-type.service';

@Injectable()
export class AssetTypeFormManager extends FormManager<null, null> {
    private _mediaAssetTypeService: MediaAssetTypeService;

    constructor() {
        super();
    }

    set categoryStore(value: MediaAssetTypeService) {
        this._mediaAssetTypeService = value;
    }

    public returnToAssetTypes(): void {
        if (this._mediaAssetTypeService) {
            this._mediaAssetTypeService.returnToAssetTypes();
        }
    }
}
