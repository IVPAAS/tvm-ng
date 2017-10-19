// import { KalturaCategoryFilter } from 'kaltura-typescript-client/types/KalturaCategoryFilter';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Observable';
import { BrowserService } from "app-shared/mc-shell";
import 'rxjs/add/operator/map';
// import { KalturaDetachedResponseProfile } from 'kaltura-typescript-client/types/KalturaDetachedResponseProfile';
// import { KalturaFilterPager } from 'kaltura-typescript-client/types/KalturaFilterPager';
// import { KalturaResponseProfileType } from 'kaltura-typescript-client/types/KalturaResponseProfileType';
// import { CategoryListAction } from 'kaltura-typescript-client/types/CategoryListAction';
// import { KalturaClient } from '@kaltura-ng/kaltura-client';
// import { KalturaCategoryListResponse } from "kaltura-typescript-client/types/KalturaCategoryListResponse";
// import { KalturaCategory } from "kaltura-typescript-client/types/KalturaCategory";

export interface MediaAssetsTypes {
    items: MediaAssetsType[],
    totalCount: number
}

export interface MediaAssetsType {
    id: number,
    name: string,
    type: TemplateType,
    lastModified?: Date,
    assetType: MediaAssetType
}

export interface KalturaCategoryListResponse {
    objects: MediaAssetsType[],
    totalCount: number
}

export enum TemplateType {
    MediaAssets = 0
}

export enum MediaAssetType {
    Movie = 0,
    Episodes = 1,
    Series = 2
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

    constructor(private browserService: BrowserService) {
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


        let categoryListResponse: KalturaCategoryListResponse;
        this._mediaAssetsTypes.getValue().items = [{ id: 1, name: "Movies", type: TemplateType.MediaAssets, assetType: MediaAssetType.Movie },
        { id: 2, name: "Episodes", type: TemplateType.MediaAssets, assetType: MediaAssetType.Episodes },
        { id: 3, name: "Series", type: TemplateType.MediaAssets, assetType: MediaAssetType.Series }]
        this._mediaAssetsTypes.getValue().totalCount = 3;
    }
}


