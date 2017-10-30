import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { MetaListAction } from 'kaltura-ott-typescript-client/types/MetaListAction';
import { KalturaMetaListResponse } from "kaltura-ott-typescript-client/types/KalturaMetaListResponse";

@Injectable()
export class MetaManagement {
  private _metaListCache$;

  constructor(private _serverClient: KalturaClient) {
  }

  private _loadMetaList(): Observable<KalturaMetaListResponse> {
    try {
      // build the request
      return <any>this._serverClient.request(
        new MetaListAction({
        })
      )
    } catch (err) {
      return Observable.throw(err);
    }
  }

  public get(): Observable<KalturaMetaListResponse> {
    if (!this._metaListCache$) {
      this._metaListCache$ = this._loadMetaList()
        .catch(err => {
          console.log(`log: [warn] [Meta-management] Error during load Meta profiles: ${err}`);
          this._metaListCache$ = null;
          return Observable.throw(err);
        })
        .publishReplay(1)
        .refCount();
    }

    return this._metaListCache$;
  }

  public clearCache(): void {
    this._metaListCache$ = null;
  }
}