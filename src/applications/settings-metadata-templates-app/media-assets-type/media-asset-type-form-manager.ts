import { KalturaMultiRequest } from 'kaltura-ott-typescript-client';
import { KalturaAssetStructListResponse } from 'kaltura-ott-typescript-client/types/KalturaAssetStructListResponse';
import { Injectable } from '@angular/core';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';
import { FormManager } from '@kaltura-ng/kaltura-ui'
import { AssetTypeService } from './media-asset-type.service';

@Injectable()
export class AssetTypeFormManager extends FormManager<KalturaAssetStructListResponse, KalturaMultiRequest> {
    
    private _mediaAssetTypeService: AssetTypeService;

    constructor() {
        super();
    }

    set MetaService(value: AssetTypeService) {
        this._mediaAssetTypeService = value;
    }

    public returnToAssetTypes(): void {
        if (this._mediaAssetTypeService) {
            this._mediaAssetTypeService.returnToAssetTypes();
        }
    }
}
