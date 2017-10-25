import { Observable } from 'rxjs/Observable';
import { AssetTypeWidgetKeys } from './../media-asset-type-widget-keys';
import { MediaAssetTypeFormWidget } from 'applications/settings-metadata-templates-app/media-assets-type/media-asset-type-form-widget';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppAuthentication } from "app-shared/mc-shell";
import { AppLocalization } from "@kaltura-ng/kaltura-common";


export interface MetadataRow {
    identifier: string,
    label: string,
    fieldType: string,
    multipleValue: boolean,
    isProtected: boolean
}

@Injectable()
export class AssetTypeMetadataHandler extends MediaAssetTypeFormWidget {

    private _metadataRows = new BehaviorSubject<{ items: MetadataRow[] }>({ items: [] });
    public _metadataRows$ = this._metadataRows.asObservable();

    constructor(private _kalturaServerClient: KalturaClient,
        private _appAuthentication: AppAuthentication,
        private _appLocalization: AppLocalization) {

        super(AssetTypeWidgetKeys.Metadata);
    }

    protected _onActivate(firstTimeActivating: boolean) {
        
             
        
            }

    

    
            public setDirty() {
        super._updateWidgetState({
            isDirty: true
        });
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


