import { MediaAssetsType, MediaAssetsTypesService } from './media-assets-types.service';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { DataTable } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
//import { CategoriesService } from "./categories.service";


@Component({
	selector: 'kMediaAssetsTypesTable',
	templateUrl: './media-assets-types-table.component.html',
	styleUrls: ['./media-assets-types-table.component.scss']
})
export class MediaAssetsTypesTableComponent  implements AfterViewInit, OnInit, OnDestroy{

	public _blockerMessage: AreaBlockerMessage = null;

	public _mediaAssetsTypes: MediaAssetsType[] = [];
	private _deferredMediaAssetsTypes: any[];
	@Input() set mediaAssetsTypes(data: any[]) {
		if (!this._deferredLoading) {
			// the table uses 'rowTrackBy' to track changes by id. To be able to reflect changes of entries
			// (ie when returning from entry page) - we should force detect changes on an empty list
			this._mediaAssetsTypes = [];
			this.cdRef.detectChanges();
			this._mediaAssetsTypes = data;
			this.cdRef.detectChanges();
		} else {
			this._deferredMediaAssetsTypes = data
		}
	}

	@ViewChild('dataTable') private _dataTable: DataTable;
	private _categoriesServiceStatusSubscription: ISubscription;

	public _deferredLoading = true;
	public _emptyMessage: string = "";

	public rowTrackBy: Function = (index: number, item: any) => { return item.id };

	constructor(private appLocalization: AppLocalization,
		public mediaAssetsTypesService: MediaAssetsTypesService,
		private cdRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this._blockerMessage = null;
		this._emptyMessage = "";
		let loadedOnce = false; // used to set the empty message to "no results" only after search
		this._categoriesServiceStatusSubscription = this.mediaAssetsTypesService.state$.subscribe(
			result => {
				if (result.errorMessage) {
					this._blockerMessage = new AreaBlockerMessage({
						message: result.errorMessage || "Error loading entries",
						buttons: [{
							label: 'Retry',
							action: () => {
								this.mediaAssetsTypesService.reload(true);
							}
						}
						]
					})
				} else {
					this._blockerMessage = null;
					if (result.loading) {
						this._emptyMessage = "";
						loadedOnce = true;
					} else {
						if (loadedOnce) {
							this._emptyMessage = this.appLocalization.get('applications.content.table.noResults');
						}
					}
				}
			},
			error => {
				console.warn("[kmcng] -> could not load entries"); //navigate to error page
				throw error;
			});
	}

	ngOnDestroy() {
		this._categoriesServiceStatusSubscription.unsubscribe();
		this._categoriesServiceStatusSubscription = null;
	}

	ngAfterViewInit() {

		if (this._deferredLoading) {
			// use timeout to allow the DOM to render before setting the data to the datagrid. This prevents the screen from hanging during datagrid rendering of the data.
			setTimeout(() => {
				this._deferredLoading = false;
				this._mediaAssetsTypes = this._deferredMediaAssetsTypes;
				this._deferredMediaAssetsTypes = null;
			}, 0);
		}
	}
}