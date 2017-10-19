import { Observable } from 'rxjs/Observable';
import { AssetTypeWidgetKeys } from './../media-asset-type-widget-keys';
import { MediaAssetTypeFormWidget } from 'applications/settings-metadata-templates-app/media-assets-type/media-asset-type-form-widget';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';


@Injectable()
export class AssetTypeMetadataHandler extends MediaAssetTypeFormWidget {

    public metadataForm: FormGroup;

    constructor(private _kalturaServerClient: KalturaClient,
        private _formBuilder: FormBuilder) {
        super(AssetTypeWidgetKeys.Metadata);

        this._buildForm();
    }

    private _buildForm(): void {
    }

    private _monitorFormChanges() {

    }

    public setDirty() {
        super._updateWidgetState({
            isDirty: true
        });
    }

    protected _onActivate(firstTimeActivating: boolean): Observable<{ failed: boolean }> {
        return null;
    }

    private _syncHandlerContent() {

    }

    protected _onDataSaving(newData: null, request: null): void {


    }

    /**
   * Do some cleanups if needed once the section is removed
   */
    protected _onReset() {

    }
}


