import { AssetTypeService, ActionTypes } from './media-asset-type.service';
import { MediaAssetsTypesService } from './../media-assets-types/media-assets-types.service';
import { AssetTypeMetadataHandler } from './asset-type-metadata/asset-type-metadata-handler';
import { AssetTypeSectionsListHandler } from './asset-type-section-list/asset-type-sections-list-handler';
import { AssetTypeFormManager } from './media-asset-type-form-manager';
import { Component, OnInit, Inject, OnDestroy, Pipe } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { DataTable } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage, AreaBlockerMessageButton } from '@kaltura-ng/kaltura-ui';
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

    _mediaAssetName: string;
    _mediaAssetType: string;

    public _showLoader = false;
    public _structHeader: string;
    public _areaBlockerMessage: AreaBlockerMessage;
    public _currentMediaAssetTypeId: string;
    public _assetStructHasChanges: boolean;

    constructor(private _assetTypeListService: MediaAssetsTypesService,
        private _assetTypeService: AssetTypeService,
        private _assetTypeFormManager: AssetTypeFormManager,
        private _browserService: BrowserService,
        @Inject(MediaAssetTypeFormWidget) private _widgets: MediaAssetTypeFormWidget[],
        private _appLocalization: AppLocalization) {
    }

    ngOnDestroy() {
    }

    private _updateNavigationState() {} //TODO: anat

    ngOnInit() {
        this._assetTypeFormManager.registerWidgets(this._widgets);

        this._assetTypeService.state$
        .cancelOnDestroy(this)
        .subscribe(
            status => {

                this._showLoader = false;
                this._areaBlockerMessage = null;

                if (status) {
                    switch (status.action) {
                        case ActionTypes.Loading:
                            this._showLoader = true;

                            // when loading new entry in progress, the 'entryID' property
                            // reflect the entry that is currently being loaded
                            // while 'entry$' stream is null
                            this._currentMediaAssetTypeId = this._assetTypeService._assetStructId;
                            this._updateNavigationState();
                            this._assetStructHasChanges = false;
                            break;
                        case ActionTypes.Loaded:
                            this._mediaAssetName = this._assetTypeService.assetStructId;
                            this._mediaAssetType = "Movie";//TODO: anat this._entryStore.entry.mediaType;
                            break;
                        case ActionTypes.LoadingFailed:
                            let message = status.error ? status.error.message : '';
                            message = message || this._appLocalization.get('applications.settings.errors.loadError');
                            this._areaBlockerMessage = new AreaBlockerMessage({
                                message: message,
                                buttons: [
                                    this._createBackToMediaAssetsTypesButton(),
                                    {
                                        label: this._appLocalization.get('applications.settings.errors.retry'),
                                        action: () => {
                                            this._assetTypeService.reloadMediaAssetType();
                                        }
                                    }
                                ]
                            });
                            break;
                        case ActionTypes.Saving:
                            this._showLoader = true;
                            break;
                        case ActionTypes.SavingFailed:

                            this._areaBlockerMessage = new AreaBlockerMessage({
                                message: this._appLocalization.get('applications.settings.errors.saveError'),
                                buttons: [
                                    {
                                        label: this._appLocalization.get('applications.settings.errors.reload'),
                                        action: () => {
                                            this._assetTypeService.reloadMediaAssetType();
                                        }
                                    }
                                ]
                            });
                            break;
                        case ActionTypes.DataIsInvalid:

                            this._areaBlockerMessage = new AreaBlockerMessage({
                                message: this._appLocalization.get('applications.settings.errors.validationError'),
                                buttons: [
                                    {
                                        label: this._appLocalization.get('applications.settings.errors.dismiss'),
                                        action: () => {
                                            this._areaBlockerMessage = null;
                                        }
                                    }
                                ]
                            });
                            break;
                        case ActionTypes.ActiveSectionBusy:

                            this._areaBlockerMessage = new AreaBlockerMessage({
                                message: this._appLocalization.get('applications.settings.errors.busyError'),
                                buttons: [
                                    {
                                        label: this._appLocalization.get('applications.settings.errors.dismiss'),
                                        action: () => {
                                            this._areaBlockerMessage = null;
                                        }
                                    }
                                ]
                            });
                            break;
                        case ActionTypes.PrepareSavingFailed:

                            this._areaBlockerMessage = new AreaBlockerMessage({
                                message: this._appLocalization.get('applications.settings.errors.savePrepareError'),
                                buttons: [
                                    {
                                        label: this._appLocalization.get('applications.settings.errors.dismiss'),
                                        action: () => {
                                            this._areaBlockerMessage = null;
                                        }
                                    }
                                ]
                            });
                            break;
                        default:
                            break;
                    }
                }
            },
            error => {
                // TODO [mc] navigate to error page
                throw error;
            });

    }

    private _createBackToMediaAssetsTypesButton(): AreaBlockerMessageButton {
		return {
			label: this._appLocalization.get('applications.settings.messages.backToMediaAssetsTypes'),
			action: () => {
				this._assetTypeService.returnToAssetTypes();
			}
		};
	}

    public _backToList() {
        this._assetTypeService.returnToAssetTypes();
        
    }

    public _save() {
        this._assetTypeService.saveEntry();
    }
}
