import { MediaAssetsTypesService, SortDirection } from './media-assets-types.service';
import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AreaBlockerMessage } from "@kaltura-ng/kaltura-ui";
import { PopupWidgetComponent } from "@kaltura-ng/kaltura-ui/popup-widget/popup-widget.component";
import { MediaAssetsTypesTableComponent } from "./media-assets-types-table.component";
import { BrowserService } from 'app-shared/mc-shell';
import { AppLocalization } from "@kaltura-ng/kaltura-common";

@Component({
    selector: 'kMediaAssetsTypesList',
    templateUrl: './media-assets-types-list.component.html',
    styleUrls: ['./media-assets-types-list.component.scss']
})

export class MediaAssetsTypesListComponent implements OnInit, OnDestroy {

    public _isBusy = false
    public _blockerMessage: AreaBlockerMessage = null;
    public _MediaTypes: any[] = [];
    public _MediaTypesTotalCount: number = null;
    private MediaTypesSubscription: ISubscription;
    private querySubscription: ISubscription;

    public _filter = {
        sortBy: 'name',
        sortDirection: SortDirection.Desc
    };




    constructor(private _mediaAssetsTypesService: MediaAssetsTypesService,
        private router: Router,
        private _browserService: BrowserService,
        private _appLocalization: AppLocalization) {
    }

    ngOnInit() {

        // this.querySubscription = this._MediaTypesService.queryData$.subscribe(
        //     query => {
        //         this._filter.pageSize = query.pageSize;
        //         this._filter.pageIndex = query.pageIndex - 1;
        //         this._filter.sortBy = query.sortBy;
        //         this._filter.sortDirection = query.sortDirection;
        //         this.dataTable.scrollToTop();
        //     });

        this.MediaTypesSubscription = this._mediaAssetsTypesService._mediaAssetsTypes$.subscribe(
            (data) => {
                this._MediaTypes = data.items;
                this._MediaTypesTotalCount = data.totalCount;
            }
        );
    }

    ngOnDestroy() {
        // this.MediaTypesSubscription.unsubscribe();
        // this.querySubscription.unsubscribe();
    }

    _onSortChanged(event): void {
        // this._MediaTypesService.reload({
        //     sortBy: event.field,
        //     sortDirection: event.order === 1 ? SortDirection.Asc : SortDirection.Desc
        // });
    }

    _onPaginationChanged(state: any): void {
        // if (state.page !== this._filter.pageIndex || state.rows !== this._filter.pageSize) {

        //     this._clearSelection();
        //     this._MediaTypesService.reload({
        //         pageIndex: state.page + 1,
        //         pageSize: state.rows
        //     });
        // }
    }

    _onActionSelected(event: { action: string, mediaAssetsTypeID: number }) {
        switch (event.action) {
            case "edit":
                this.router.navigate(['/settings/metadataTemplates/mediaAssetsType', event.mediaAssetsTypeID]);
                break;
            default:
                break;
        }
    }

}