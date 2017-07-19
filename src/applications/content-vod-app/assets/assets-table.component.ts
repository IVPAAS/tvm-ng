import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { MenuItem, DataTable, Menu } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { AssetsStore } from "./assets-store/assets-store.service";
import { environment } from 'app-environment';
import { AppAuthentication } from 'app-shared/mc-shell';
import { KalturaMediaAsset } from 'kaltura-ott-typescript-client/types/KalturaMediaAsset';

@Component({
	selector: 'kAssetsTable',
	templateUrl: './assets-table.component.html',
	styleUrls: ['./assets-table.component.scss']
})
export class AssetsTableComponent implements AfterViewInit, OnInit, OnDestroy {

	public _blockerMessage: AreaBlockerMessage = null;

	public _assets: any[] = [];
	private _deferredAssets : any[];
	@Input() set assets(data: any[]) {
		if (!this._deferredLoading) {
			// the table uses 'rowTrackBy' to track changes by id. To be able to reflect changes of assets
			// (ie when returning from asset page) - we should force detect changes on an empty list
			this._assets = [];
			this.cdRef.detectChanges();
			this._assets = data;
			this.cdRef.detectChanges();
		}else {
			this._deferredAssets = data
		}
	}

	@Input() filter: any = {};
	@Input() selectedAssets: any[] = [];

	@Output()
	sortChanged = new EventEmitter<any>();
	@Output()
	actionSelected = new EventEmitter<any>();
	@Output()
	selectedAssetsChange = new EventEmitter<any>();

	@ViewChild('dataTable') private dataTable: DataTable;
	@ViewChild('actionsmenu') private actionsMenu: Menu;
	private actionsMenuAssetId: string = "";
	private assetsStoreStatusSubscription: ISubscription;

	public _deferredLoading = true;
	public _emptyMessage: string = "";

	public _items: MenuItem[];

	public rowTrackBy: Function = (index: number, item: any) => {return item.id};

	constructor(private appAuthentication : AppAuthentication, private appLocalization: AppLocalization, public assetsStore: AssetsStore, private cdRef:ChangeDetectorRef) {
	}

	_convertSortValue(value: boolean): number {
		return value ? 1 : -1;

	}

	ngOnInit() {
		this._blockerMessage = null;
		this._emptyMessage = "";
		let loadedOnce = false; // used to set the empty message to "no results" only after search
		this.assetsStoreStatusSubscription = this.assetsStore.state$.subscribe(
			result => {
				if (result.errorMessage) {
					this._blockerMessage = new AreaBlockerMessage({
						message: result.errorMessage || "Error loading assets",
						buttons: [{
							label: 'Retry',
							action: () => {
								this.assetsStore.reload(true);
							}}
						]
					})
				} else {
					this._blockerMessage = null;
					if (result.loading){
						this._emptyMessage = "";
						loadedOnce = true;
					}else {
						if (loadedOnce) {
							this._emptyMessage = "No Results";
						}
					}
				}
			},
			error => {
				console.warn("[tvm-ng] -> could not load assets"); //navigate to error page
				throw error;
			});
	}

	getImage(asset : KalturaMediaAsset) : string{
		if (asset.images && asset.images.length)
		{
			return asset.images[0].url;
		}else{
			return "";
		}
	}
	ngOnDestroy() {
		this.actionsMenu.hide();
		this.assetsStoreStatusSubscription.unsubscribe();
		this.assetsStoreStatusSubscription = null;
	}



	ngAfterViewInit() {
		const scrollBody = this.dataTable.el.nativeElement.getElementsByClassName("ui-datatable-scrollable-body");
		if (scrollBody && scrollBody.length > 0) {
			scrollBody[0].onscroll = () => {
				if (this.actionsMenu) {
					this.actionsMenu.hide();
				}
			}
		}
		if (this._deferredLoading) {
			// use timeout to allow the DOM to render before setting the data to the datagrid. This prevents the screen from hanging during datagrid rendering of the data.
			setTimeout(()=> {
				this._deferredLoading = false;
				this._assets = this._deferredAssets;
				this._deferredAssets = null;
			}, 0);
		}
	}

	private getTypeLabel(typeId : number) : string{
		let partnerConfiguration = environment.partnerTempConfig[this.appAuthentication.appUser.partnerId];

		if (partnerConfiguration)
		{
			const mediaType = partnerConfiguration.vodMediaTypeIds.find(item => item.id === typeId);

			return mediaType ? mediaType.label : 'n/a';
		}else {
			return 'n/a'
		}
	}

	openActionsMenu(event: any, asset: any) {

	}

	allowDrilldown(mediaType: string, status: string) {
		return true;
	}

	onActionSelected(action: string, assetID: string, mediaType: string = null, status: string = null) {
		if (this.allowDrilldown(mediaType, status)) {
			this.actionSelected.emit({"action": action, "assetID": assetID});
		}
	}

	onSortChanged(event) {
		this.sortChanged.emit(event);
	}

	onSelectionChange(event) {
		this.selectedAssetsChange.emit(event);
	}

	scrollToTop() {
		const scrollBodyArr = this.dataTable.el.nativeElement.getElementsByClassName("ui-datatable-scrollable-body");
		if (scrollBodyArr && scrollBodyArr.length > 0) {
			const scrollBody: HTMLDivElement = scrollBodyArr[0];
			scrollBody.scrollTop = 0;
		}
	}
}

