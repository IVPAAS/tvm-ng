import { AssetTypeService } from './media-asset-type.service';
import { MediaAssetsTypesService } from './../media-assets-types/media-assets-types.service';
import { AssetTypeMetadataHandler } from './asset-type-metadata/asset-type-metadata-handler';
import { AssetTypeSectionsListHandler } from './asset-type-section-list/asset-type-sections-list-handler';
import { AssetTypeFormManager } from './media-asset-type-form-manager';
import { Component, OnInit, Inject, OnDestroy, Pipe } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { DataTable } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { MediaAssetTypeFormWidget } from './media-asset-type-form-widget';
import { BrowserService } from 'app-shared/mc-shell';

@Component({
    selector: 'kMediaAssetsType',
    templateUrl: './media-asset-type.component.html',
    styleUrls: ['./media-asset-type.component.scss'],
    providers: [
        AssetTypeService,
        AssetTypeFormManager,
        {
            provide: MediaAssetTypeFormWidget,
            useClass: AssetTypeSectionsListHandler,
            multi: true
        },
        {
            provide: MediaAssetTypeFormWidget,
            useClass: AssetTypeMetadataHandler,
            multi: true
        }
    ]
})
export class MediaAssetTypeComponent implements OnInit, OnDestroy {

    public _showLoader = false;
    public _structHeader: string;
    public _areaBlockerMessage: AreaBlockerMessage;
    public isSafari = false; // used for Safari specific styling

    constructor(private _assetTypeListService: MediaAssetsTypesService,
        private _formManager: AssetTypeFormManager,
        private _browserService: BrowserService,
        @Inject(MediaAssetTypeFormWidget) private _widgets: MediaAssetTypeFormWidget[],
        private _appLocalization: AppLocalization) {
    }

    ngOnInit() {
        this._formManager.registerWidgets(this._widgets);
        this.isSafari = this._browserService.isSafari();
    }

    ngOnDestroy() {
    }

    public _backToList() {
    }

    public _save() {
    }
}
