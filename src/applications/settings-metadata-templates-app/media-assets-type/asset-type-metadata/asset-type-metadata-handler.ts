import { Observable } from 'rxjs/Observable';
import { AssetTypeWidgetKeys } from './../media-asset-type-widget-keys';
import { MediaAssetTypeFormWidget } from 'applications/settings-metadata-templates-app/media-assets-type/media-asset-type-form-widget';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppAuthentication } from "app-shared/mc-shell";
import { AppLocalization } from "@kaltura-ng/kaltura-common";
import { MetaListAction } from "kaltura-ott-typescript-client/types/MetaListAction";
import { KalturaMetaFilter } from "kaltura-ott-typescript-client/types/KalturaMetaFilter";
import { KalturaMetaListResponse } from "kaltura-ott-typescript-client/types/KalturaMetaListResponse";
import { KalturaMeta } from "kaltura-ott-typescript-client/types/KalturaMeta";


export interface MetadataRow {
    id: number,
    name: string,
    systemName: string
    fieldType: string,
    //multipleValue: boolean,
    isProtected: boolean
}

@Injectable()
export class AssetTypeMetadataHandler extends MediaAssetTypeFormWidget {

    private _metadataRows = new BehaviorSubject<{ items: MetadataRow[] }>({ items: [] });
    public _metadataRows$ = this._metadataRows.asObservable();
    private _assetStructId: number;


    constructor(private _kalturaServerClient: KalturaClient,
        private _appAuthentication: AppAuthentication,
        private _appLocalization: AppLocalization) {

        super(AssetTypeWidgetKeys.Metadata);
    }

    protected _onActivate(firstTimeActivating: boolean) {

        
        super._showLoader();
        if (firstTimeActivating) {
            //TODO: Anat
        }
        this._metadataRows.next({ items: [] });

        const getMetadatas$ = this._kalturaServerClient.request(new MetaListAction(
		    {
			    filter: new KalturaMetaFilter(
				    {
					    assetStructIdEqual : 1883
				    }
			    )
		    }))
            .monitor('get metadata');
            

            return Observable.forkJoin(getMetadatas$)
		    .cancelOnDestroy(this,this.widgetReset$)

		    .catch((error, caught) =>
		    {
			    super._hideLoader();
			    super._showActivationError();
			    this._metadataRows.next({items : []});
			    return Observable.throw(error);
		    })
		    .do(responses => {
			    const metadataRows = (responses[0] as KalturaMetaListResponse).objects || [];			    
			    this.buildMetaDataRows(metadataRows);
			    super._hideLoader();
		    });



        // return this._kalturaServerClient.request(new MetaListAction({
        //     filter: new KalturaMetaFilter({
        //         assetStructIdEqual: 1883
        //     })
        // }))
        //     .cancelOnDestroy(this, this.widgetReset$)
        //     .monitor('get metadata')
        //     .do(
        //     response => {
        //         this._metadataRows.next({ items: response.objects as any[] });

        //         super._hideLoader();
        //     })
        //     .catch((error, caught) => {
        //         super._hideLoader();
        //         super._showActivationError();
        //         this._metadataRows.next({ items: [] });
        //         return Observable.throw(error);
        //     }
        //     );

    }

    private buildMetaDataRows(kalturaMetaList: KalturaMeta[]): void{
	    let metadataRows: MetadataRow[] = [];
	    // create a MetadataRow data for each of the loaded KalturaMeta
	    kalturaMetaList.forEach( (kalturaMeta: KalturaMeta) => {
            if(kalturaMeta.features.match('metadata')){
			    let metadataRow: MetadataRow = {
                    id: kalturaMeta.id,
                    name: kalturaMeta.name,
                    systemName: kalturaMeta.systemName,
                    fieldType: kalturaMeta.type.toString(),
                    isProtected: kalturaMeta.isProtected
			    };
			    //metadataRow.isDefault = kalturaMeta.tags.indexOf("default_thumb") > -1;
			    //metadataRow.url = environment.core.kaltura.cdnUrl + "/api_v3/index.php/service/thumbasset/action/serve/ks/" + this._appAuthentication.appUser.ks + "/thumbAssetId/" + metadataRow.id;
                metadataRows.push(metadataRow);
            }
		    
	    });
	   
	    this._metadataRows.next({items : metadataRows});
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

    // animate uploading thumbnail row
	public _getRowStyle(rowData, rowIndex): string{
		return rowData.uploadStatus ? "uploading" : '';
	}
}


