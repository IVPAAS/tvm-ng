import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/subscribeOn';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';

import { BrowserService } from "app-shared/mc-shell/providers/browser.service";
import { AssetListAction } from 'kaltura-ott-typescript-client/types/AssetListAction';
import { KalturaSearchAssetFilter } from 'kaltura-ott-typescript-client/types/KalturaSearchAssetFilter';
import { KalturaMediaAsset } from 'kaltura-ott-typescript-client/types/KalturaMediaAsset';
import { KalturaFilterPager } from 'kaltura-ott-typescript-client/types/KalturaFilterPager';
import { environment } from 'app-environment';
import { AppAuthentication } from 'app-shared/mc-shell';

export type UpdateStatus = {
    loading : boolean;
    errorMessage : string;
};


export interface Assets{
    items : any[],
    totalCount : number
}

export interface QueryData
{
    pageIndex? : number,
    pageSize? : number
}

export interface QueryRequestArgs {
    data : QueryData;
}

@Injectable()
    export class AssetsStore implements OnDestroy{

    private static filterTypeMapping = {};

    private _assets  = new BehaviorSubject<{items : KalturaMediaAsset[], totalCount : number}>({items: [], totalCount: 0});
    private _state = new BehaviorSubject<UpdateStatus>({ loading : false, errorMessage : null});

    private _queryData : QueryData = {
        pageIndex: 1,
        pageSize: 50,
    };
    private _querySource = new Subject<QueryRequestArgs>();
	private _destoryed: boolean = false;

    private executeQueryState  : { subscription : ISubscription} = { subscription : null };

    public assets$ = this._assets.asObservable();
    public state$ = this._state.asObservable();
    public query$ = this._querySource.asObservable();

    constructor(private kalturaServerClient: KalturaClient,
                private appAuthentication : AppAuthentication,
                private browserService: BrowserService) {
        const defaultPageSize = this.browserService.getFromLocalStorage("assets.list.pageSize");
        if (defaultPageSize !== null) {
            this._queryData.pageSize = defaultPageSize;
        }
    }

    public get queryData() : QueryData{
        return Object.assign({}, this._queryData);
    }

    ngOnDestroy()
    {
        if (this.executeQueryState.subscription) {
            this.executeQueryState.subscription.unsubscribe();
            this.executeQueryState.subscription = null;
        }

        this._state.complete();
        this._querySource.complete();
        this._assets.complete();
	    this._destoryed = true;
    }

    public get assets() : any[]
    {
        return this._assets.getValue().items;
    }

    public reload(force : boolean) : void;
    public reload(query : QueryData) : void;
    public reload(query : boolean | QueryData) : void {
        const forceReload = (typeof query === 'object' || (typeof query === 'boolean' && query));

        if (forceReload || this._assets.getValue().totalCount === 0) {
            if (typeof query === 'object') {
                Object.assign(this._queryData, query);
            }
            this._executeQuery();
        }
    }

    private _executeQuery()
    {
        // cancel previous requests
        if (this.executeQueryState.subscription)
        {
            this.executeQueryState.subscription.unsubscribe();
            this.executeQueryState.subscription = null;
        }
        // TODO [tvmng] remove temporary bypass
        const temporary = new KalturaMediaAsset();

        this._state.next( { loading : true, errorMessage : null });
        this.buildQueryRequest({ data : this._queryData}).subscribe(
            response =>
            {
                this._assets.next({ items : response.objects, totalCount : response.totalCount});
                this._state.next( { loading : false, errorMessage : null });

            },
            reason =>
            {
                this._state.next( { loading : false, errorMessage : reason.message });
            }
        )

        this.browserService.setInLocalStorage("assets.list.pageSize", this._queryData.pageSize);
    }

    private buildQueryRequest({ data : queryData } : { data : QueryData}) : Observable<any> {

        try {
            let partnerConfiguration = environment.partnerTempConfig[this.appAuthentication.appUser.partnerId];
            let typeIn = partnerConfiguration ? partnerConfiguration.vodMediaTypeIds.map(type =>
            {
                return type.id
            }) : null;


           return this.kalturaServerClient.request(
               new AssetListAction({
                   filter: new KalturaSearchAssetFilter(
                       {
                           typeIn
                       }
                   ),
                   pager: new KalturaFilterPager({
                       pageSize: queryData.pageSize,
                       pageIndex: queryData.pageIndex
                   })
               }));
        }catch(err)
        {
            return Observable.throw(err);
        }

    }

    public deleteAsset(assetId: string): Observable<void>{
        throw new Error("TBD");

    }
}
