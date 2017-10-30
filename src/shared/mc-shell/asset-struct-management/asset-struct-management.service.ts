import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { AssetStructListAction } from 'kaltura-ott-typescript-client/types/assetstructListAction';
import { KalturaAssetStructListResponse } from "kaltura-ott-typescript-client/types/KalturaAssetStructListResponse";

@Injectable()
export class AssetStructManagement {
  private _assetStructListCache$;

  constructor(private _serverClient: KalturaClient) {

  }

  private _loadAssetStructList(): Observable<KalturaAssetStructListResponse> {
    try {
      // build the request
      return <any>this._serverClient.request(
          new AssetStructListAction({              
          })
      )
  } catch (err) {
      return Observable.throw(err);
  }
  }

  public get(): Observable<KalturaAssetStructListResponse> {
    if (!this._assetStructListCache$) {
      this._assetStructListCache$ = this._loadAssetStructList()
        .catch(err => {
          console.log(`log: [warn] [AssetStruct-management] Error during load AssetStruct profiles: ${err}`);
          this._assetStructListCache$ = null;
          return Observable.throw(err);
        })
        .publishReplay(1)
        .refCount();
    }

    return this._assetStructListCache$;
  }

  public clearCache(): void {
    this._assetStructListCache$ = null;
  }

}