import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';
import { Message } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { BrowserService } from "app-shared/mc-shell/providers/browser.service";

import { AssetsStore } from './assets-store/assets-store.service';
import { AssetsTableComponent } from "./assets-table.component";


export type UpdateStatus = {
	busy : boolean;
	errorMessage : string;
};

@Component({
    selector: 'kAssetsList',
    templateUrl: './assets-list.component.html',
    styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit, OnDestroy {

  @ViewChild(AssetsTableComponent) private dataTable: AssetsTableComponent;

	private _state = new BehaviorSubject<UpdateStatus>({ busy : false, errorMessage : null});
	public state$ = this._state.asObservable();
	public _blockerMessage: AreaBlockerMessage = null;

    private querySubscription : ISubscription;
    public _selectedAssets: any[] = [];
	public _msgs: Message[] = [];

    public _filter = {
        pageIndex : 0,
        pageSize : null, // pageSize is set to null by design. It will be modified after the first time loading assets
    };

    constructor(public _assetsStore : AssetsStore, private appLocalization: AppLocalization, private router: Router, private _browserService : BrowserService) {

    }

    onFreetextChanged() : void{
    }

    onSortChanged(event) {
	    this.clearSelection();
    }

    onPaginationChanged(state : any) : void {
    	if (state.page !== this._filter.pageIndex || state.rows !== this._filter.pageSize) {
		    this._filter.pageIndex = state.page;
		    this._filter.pageSize = state.rows;

		    this.clearSelection();
		    this._assetsStore.reload({
			    pageIndex: this._filter.pageIndex + 1,
			    pageSize: this._filter.pageSize
		    });
	    }
    }

    ngOnInit() {

        const query = this._assetsStore.queryData;

        if (query) {
            this._filter.pageSize = query.pageSize;
            this._filter.pageIndex = query.pageIndex - 1;
        }

        this.querySubscription = this._assetsStore.query$.subscribe(
            query => {

               this._filter.pageSize = query.data.pageSize;
               this._filter.pageIndex = query.data.pageIndex-1;
               this.dataTable.scrollToTop();
            }
        );

        this._assetsStore.reload(false);
    }

    ngOnDestroy(){
        this.querySubscription.unsubscribe();
        this.querySubscription = null;
    }

    public _reload()
    {
    	this.clearSelection();
        this._assetsStore.reload(true);
    }


    onActionSelected(event){
    }

    private deleteAsset(assetId: string): void{
    }

    clearSelection(){
        this._selectedAssets = [];
    }

	onSelectedAssetsChange(event):void{
		this._selectedAssets = event;
	}

  onBulkChange(event): void{
    if (event.reload === true){
      this._reload();
    }else{
      // this.clearSelection();
      // this._msgs = [];
      // this._msgs.push({severity: 'success', summary: '', detail: this.appLocalization.get('applications.content.bulkActions.updated')});
    }
  }

}

