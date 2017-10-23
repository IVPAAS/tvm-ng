import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Observable';
import { BrowserService } from "app-shared/mc-shell";
import 'rxjs/add/operator/map';
import { AssetStructListAction } from 'kaltura-ott-typescript-client/types/assetstructListAction';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { KalturaAssetStructFilter } from "kaltura-ott-typescript-client/types/KalturaAssetStructFilter";
import { KalturaAssetStructListResponse } from "kaltura-ott-typescript-client/types/KalturaAssetStructListResponse";
import { KalturaAssetStruct } from "kaltura-ott-typescript-client/types/KalturaAssetStruct";

export interface MediaAssetsTypes {
    items: KalturaAssetStruct[],
    totalCount: number
}

export enum TemplateType {
    MediaAssets = 0
}

export type UpdateStatus = {
    loading: boolean;
    errorMessage: string;
};

export interface QueryData {
    pageIndex: number,
    pageSize: number,
    fields: string
}

export enum SortDirection {
    Desc,
    Asc
}

@Injectable()
export class MediaAssetsTypesService implements OnDestroy {

    private _mediaAssetsTypes = new BehaviorSubject<MediaAssetsTypes>({ items: [], totalCount: 0 });
    private _state = new BehaviorSubject<UpdateStatus>({ loading: false, errorMessage: null });
    private _mediaAssetsTypesExecuteSubscription: ISubscription;
    private _queryData = new BehaviorSubject<QueryData>({
        pageIndex: 1,
        pageSize: 50,
        fields: 'id,name'
    });

    public state$ = this._state.asObservable();
    public _mediaAssetsTypes$ = this._mediaAssetsTypes.asObservable();
    public queryData$ = this._queryData.asObservable();

    constructor(private _kalturaClient: KalturaClient,
        private browserService: BrowserService) {
        this.reload(false);
    }

    ngOnDestroy() {
        this._state.complete();
        this._queryData.complete();
        this._mediaAssetsTypes.complete();
        if (this._mediaAssetsTypesExecuteSubscription) {
            this._mediaAssetsTypesExecuteSubscription.unsubscribe();
            this._mediaAssetsTypesExecuteSubscription = null;
        }
    }

    public reload(force: boolean): void;
    public reload(query: Partial<QueryData>): void;
    public reload(query: boolean | Partial<QueryData>): void {
        const forceReload = (typeof query === 'object' || (typeof query === 'boolean' && query));

        if (forceReload || this._mediaAssetsTypes.getValue().totalCount === 0) {
            if (typeof query === 'object') {
                this._updateQueryData(query);
            }
            this._executeQuery();
        }
    }

    private _updateQueryData(partialData: Partial<QueryData>): void {
        const newQueryData = Object.assign({}, this._queryData.getValue(), partialData);
        this._queryData.next(newQueryData);
    }

    private _executeQuery(): void {
        // cancel previous requests
        if (this._mediaAssetsTypesExecuteSubscription) {
            this._mediaAssetsTypesExecuteSubscription.unsubscribe();
        }

        this._state.next({ loading: true, errorMessage: null });

        // execute the request
        this._mediaAssetsTypesExecuteSubscription = this.buildQueryRequest(this._queryData.getValue()).subscribe(
            response => {
                this._mediaAssetsTypesExecuteSubscription = null;

                this._state.next({ loading: false, errorMessage: null });

                this._mediaAssetsTypes.next({
                    items: response.objects,
                    totalCount: <number>response.totalCount
                });
            },
            error => {
                this._mediaAssetsTypesExecuteSubscription = null;
                const errorMessage = error & error.message ? error.message : typeof error === 'string' ? error : 'invalid error';
                this._state.next({ loading: false, errorMessage });
            });
    }

    private buildQueryRequest(queryData: QueryData): Observable<KalturaAssetStructListResponse> {
        try {
            let filter: KalturaAssetStructFilter = new KalturaAssetStructFilter({});
            filter.metaIdsContains = "4";

            // build the request
            return <any>this._kalturaClient.request(
                new AssetStructListAction({
                    filter
                })
            )
        } catch (err) {
            return Observable.throw(err);
        }

    }
}


