import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AreaBlockerMessage } from "@kaltura-ng/kaltura-ui";
import { PopupWidgetComponent } from "@kaltura-ng/kaltura-ui/popup-widget/popup-widget.component";
import { MediaAssetsTypesTableComponent } from "./media-assets-types-table.component";
// import { CategoriesService, Categories, SortDirection } from './categories.service';
import { BrowserService } from 'app-shared/mc-shell';
import { AppLocalization } from "@kaltura-ng/kaltura-common";

@Component({
    selector: 'kMediaAssetsTypesList',
    templateUrl: './media-assets-types-list.component.html',
    styleUrls: ['./media-assets-types-list.component.scss']
})

export class MediaAssetsTypesListComponent implements OnInit, OnDestroy {

   // @ViewChild(MediaAssetsTypesTableComponent) private dataTable: MediaAssetsTypesTableComponent;

    public _isBusy = false
    public _blockerMessage: AreaBlockerMessage = null;
    public _selectedCategories: any[] = [];
    public _categories: any[] = [];
    public _categoriesTotalCount: number = null;
    private categoriesSubscription: ISubscription;
    private querySubscription: ISubscription;

  

    constructor(private router: Router,
        private _browserService: BrowserService,
        private _appLocalization: AppLocalization) {
    }

    ngOnInit() {

        // this.querySubscription = this._categoriesService.queryData$.subscribe(
        //     query => {
        //         this._filter.pageSize = query.pageSize;
        //         this._filter.pageIndex = query.pageIndex - 1;
        //         this._filter.sortBy = query.sortBy;
        //         this._filter.sortDirection = query.sortDirection;
        //         this.dataTable.scrollToTop();
        //     });

        // this.categoriesSubscription = this._categoriesService.categories$.subscribe(
        //     (data) => {
        //         this._categories = data.items;
        //         this._categoriesTotalCount = data.totalCount;
        //     }
        // );
    }

    ngOnDestroy() {
        this.categoriesSubscription.unsubscribe();
        this.querySubscription.unsubscribe();
    }

    public _reload() {
        this._clearSelection();
        //this._categoriesService.reload(true);
    }
    _clearSelection() {
        this._selectedCategories = [];
    }

    _onSortChanged(event): void {
        // this._categoriesService.reload({
        //     sortBy: event.field,
        //     sortDirection: event.order === 1 ? SortDirection.Asc : SortDirection.Desc
        // });
    }

    _onPaginationChanged(state: any): void {
        // if (state.page !== this._filter.pageIndex || state.rows !== this._filter.pageSize) {

        //     this._clearSelection();
        //     this._categoriesService.reload({
        //         pageIndex: state.page + 1,
        //         pageSize: state.rows
        //     });
        // }
    }

    _onActionSelected(event: { action: string, categoryID: number }) {
        switch (event.action) {
            case "edit":
                this.router.navigate(['/content/categories/category', event.categoryID]);
                break;           
            default:
                break;
        }
    }    

}