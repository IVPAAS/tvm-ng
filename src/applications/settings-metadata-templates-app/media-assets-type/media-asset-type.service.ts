import { Injectable, OnDestroy, Host } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/subscribeOn';
import 'rxjs/add/operator/switchMap';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';
import { AssetTypeFormManager } from './media-asset-type-form-manager';
import { OnDataSavingReasons } from '@kaltura-ng/kaltura-ui';
import { BrowserService } from 'app-shared/mc-shell/providers/browser.service';
import { MediaAssetsTypesService } from './../media-assets-types/media-assets-types.service';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';
import { KalturaMetaListResponse } from 'kaltura-ott-typescript-client/types/KalturaMetaListResponse';
import { MetaListAction } from 'kaltura-ott-typescript-client/types/MetaListAction';
import { MetaUpdateAction } from 'kaltura-ott-typescript-client/types/MetaUpdateAction';
import { KalturaTypesFactory, KalturaMultiRequest } from 'kaltura-ott-typescript-client';
import { KalturaMetaFilter } from "kaltura-ott-typescript-client/types/KalturaMetaFilter";
import { KalturaMeta } from "kaltura-ott-typescript-client/types/KalturaMeta";

export enum ActionTypes {
    Loading,
    Loaded,
    LoadingFailed,
    Saving,
    PrepareSavingFailed,
    SavingFailed,
    DataIsInvalid,
    ActiveSectionBusy
}

declare type StatusArgs = {
    action: ActionTypes;
    error?: Error;
}

@Injectable()
export class AssetTypeService implements OnDestroy {

    private _loadMetaSubscription: ISubscription;
    private _sectionToRouteMapping: { [key: number]: string } = {};
    private _state = new BehaviorSubject<StatusArgs>({ action: ActionTypes.Loading, error: null });

    public state$ = this._state.asObservable();
    private _metaIsDirty: boolean;

    public get MetaIsDirty(): boolean {
        return this._metaIsDirty;
    }

    private _saveMetaInvoked = false;
    private _metaListResponse: BehaviorSubject<KalturaMetaListResponse> = new BehaviorSubject<KalturaMetaListResponse>(null);
    public metaListResponse$ = this._metaListResponse.asObservable();
    public _mediaTypeId: number;
    public get mediaTypeId(): number {
        return this._mediaTypeId;
    }

    public get metaListResponse(): KalturaMetaListResponse {
        return this._metaListResponse.getValue();
    }

    constructor(private _kalturaServerClient: KalturaClient,
        private _router: Router,
        private _browserService: BrowserService,
        private _mediaAssetsTypesService: MediaAssetsTypesService,
        @Host() private _formManager: AssetTypeFormManager,
        private _route: ActivatedRoute,
        private _appLocalization: AppLocalization) {

        // update form manager with it's service
        this._formManager.MetaService = this;

        this._mapSections();
        this._onSectionsStateChanges();
        this._onRouterEvents();
    }

    private _onSectionsStateChanges() {
        this._formManager.widgetsState$
            .cancelOnDestroy(this)
            .debounce(() => Observable.timer(500))
            .subscribe(
            sectionsState => {
                const newDirtyState = Object.keys(sectionsState).reduce((result, sectionName) => result ||
                    sectionsState[sectionName].isDirty, false);

                if (this._metaIsDirty !== newDirtyState) {
                    console.log(`meta service: updating meta is dirty state to ${newDirtyState}`);
                    this._metaIsDirty = newDirtyState;
                    this._updatePageExitVerification();
                }
            }
            );
    }

    private _updatePageExitVerification() {
        if (this._metaIsDirty) {
            this._browserService.enablePageExitVerification();
        } else {
            this._browserService.disablePageExitVerification();
        }
    }

    ngOnDestroy() {
        if (this._loadMetaSubscription) {
            this._loadMetaSubscription.unsubscribe();
        }

        this._state.complete();
        this._metaListResponse.complete();

        this._browserService.disablePageExitVerification();

        if (this._saveMetaInvoked) {
            this._mediaAssetsTypesService.reload(true);
        }
    }

    private _mapSections(): void {
        if (!this._route || !this._route.snapshot.data.mediaTypeRoute) {
            throw new Error('this service can be injected from component that is associated to the entry route');
        }

        this._route.snapshot.routeConfig.children.forEach(childRoute => {
            const routeSectionType = childRoute.data ? childRoute.data.sectionKey : null;

            if (routeSectionType !== null) {
                this._sectionToRouteMapping[routeSectionType] = childRoute.path;
            }
        });
    }

    private _onRouterEvents(): void {
        this._router.events
            .cancelOnDestroy(this)
            .subscribe(
            event => {
                if (event instanceof NavigationStart) {
                } else if (event instanceof NavigationEnd) {

                    // we must defer the loadEntry to the next event cycle loop to allow components
                    // to init them-selves when entering this module directly.
                    setTimeout(() => {
                        const currentMediaTypeId = this._route.snapshot.params.id;
                        const metaListResponse = this._metaListResponse.getValue();
                        if (!metaListResponse || (metaListResponse && this._mediaTypeId !== currentMediaTypeId)) {
                            this._loadMediaAssetType(currentMediaTypeId);
                        }

                        if (!this._mediaTypeId || (this._mediaTypeId !== currentMediaTypeId)) {
                            this._loadMediaAssetType(currentMediaTypeId);
                        }
                    });
                }
            }
            )
    }

    private _transmitSaveRequest(metaList: KalturaMetaListResponse) {
        this._state.next({ action: ActionTypes.Saving });

        // const request = new KalturaMultiRequest(
        //     new MetaUpdateAction({
        //         entryId: this.entryId,
        //         baseEntry: metaList
        //     })
        // );

        // this._formManager.onDataSaving(metaList, request, this.entry)
        //     .cancelOnDestroy(this)
        //     .monitor('entry store: prepare entry for save')
        //     .flatMap(
        //     (response) => {
        //         if (response.ready) {
        //             this._saveMetaInvoked = true;

        //             return this._kalturaServerClient.multiRequest(request)
        //                 .monitor('entry store: save entry')
        //                 .map(
        //                 response => {
        //                     if (response.hasErrors()) {
        //                         this._state.next({ action: ActionTypes.SavingFailed });
        //                     } else {
        //                         this._loadEntry(this.entryId);
        //                     }

        //                     return Observable.empty();
        //                 }
        //                 )
        //         } else {
        //             switch (response.reason) {
        //                 case OnDataSavingReasons.validationErrors:
        //                     this._state.next({ action: ActionTypes.DataIsInvalid });
        //                     break;
        //                 case OnDataSavingReasons.attachedWidgetBusy:
        //                     this._state.next({ action: ActionTypes.ActiveSectionBusy });
        //                     break;
        //                 case OnDataSavingReasons.buildRequestFailure:
        //                     this._state.next({ action: ActionTypes.PrepareSavingFailed });
        //                     break;
        //             }

        //             return Observable.empty();
        //         }
        //     }
        //     )
        //     .subscribe(
        //     response => {
        //         // do nothing - the service state is modified inside the map functions.
        //     },
        //     error => {
        //         // should not reach here, this is a fallback plan.
        //         this._state.next({ action: ActionTypes.SavingFailed });
        //     }
        //     );
    }
    public saveEntry(): void {

        // const newEntry = KalturaTypesFactory.createObject(this.entry);

        // if (newEntry && newEntry instanceof KalturaMetaListResponse) {
        //     this._transmitSaveRequest(newEntry)
        // } else {
        //     console.error(new Error(`Failed to create a new instance of the entry type '${this.entry ? typeof this.entry : 'n/a'}`));
        //     this._state.next({ action: ActionTypes.PrepareSavingFailed });
        // }
    }

    public reloadMediaAssetType(): void {
        if (this._mediaTypeId) {
            this._loadMediaAssetType(this._mediaTypeId);
        }
    }

    private _loadMediaAssetType(mediaAssetTypeId: number): void {
        if (this._loadMetaSubscription) {
            this._loadMetaSubscription.unsubscribe();
            this._loadMetaSubscription = null;
        }

        this._mediaTypeId = mediaAssetTypeId;
        this._metaIsDirty = false;
        this._updatePageExitVerification();

        this._state.next({ action: ActionTypes.Loading });
        this._formManager.onDataLoading(mediaAssetTypeId);

        this._loadMetaSubscription = this._getMediaAssetType(mediaAssetTypeId)
            .cancelOnDestroy(this)
            .subscribe(
            response => {

                this._metaListResponse.next(response);
                this._mediaTypeId = mediaAssetTypeId;

                const dataLoadedResult = this._formManager.onDataLoaded(response);

                if (dataLoadedResult.errors.length) {
                    this._state.next({
                        action: ActionTypes.LoadingFailed,
                        error: new Error(`one of the widgets failed while handling data loaded event`)
                    });
                } else {
                    this._state.next({ action: ActionTypes.Loaded });
                }
            },
            error => {
                this._state.next({ action: ActionTypes.LoadingFailed, error });

            }
            );
    }

    public openSection(sectionKey: string): void {
        const navigatePath = this._sectionToRouteMapping[sectionKey];

        if (navigatePath) {
            this._router.navigate([navigatePath], { relativeTo: this._route });
        }
    }

    private _getMediaAssetType(mediaAssetTypeId: number): Observable<KalturaMetaListResponse> {
        if (mediaAssetTypeId) {
            let filter: KalturaMetaFilter = new KalturaMetaFilter({});
            filter.assetStructIdEqual = mediaAssetTypeId;

            return this._kalturaServerClient.request(
                new MetaListAction({ filter })
            ).map(response => {
                if (response instanceof KalturaMetaListResponse) {
                    return response;
                } else {
                    throw new Error(`invalid type provided, expected KalturaMetaListResponse, got ${typeof response}`);
                }
            });
        } else {
            return Observable.throw(new Error('missing mediaAssetTypeId'));
        }
    }

    public openMediaAssetType(assetTypeId: string) {
        this.canLeave()
            .cancelOnDestroy(this)
            .subscribe(
            response => {
                if (response.allowed) {
                    this._router.navigate(['mediaAssetsType', assetTypeId], { relativeTo: this._route.parent });
                }
            }
            );
    }

    public canLeave(): Observable<{ allowed: boolean }> {
        return Observable.create(observer => {
            if (this._metaIsDirty) {
                this._browserService.confirm(
                    {
                        header: this._appLocalization.get('applications.content.MediaAssetTypeDetails.captions.cancelEdit'),
                        message: this._appLocalization.get('applications.content.MediaAssetTypeDetails.captions.discard'),
                        accept: () => {
                            this._metaIsDirty = false;
                            observer.next({ allowed: true });
                            observer.complete();
                        },
                        reject: () => {
                            observer.next({ allowed: false });
                            observer.complete();
                        }
                    }
                )
            } else {
                observer.next({ allowed: true });
                observer.complete();
            }
        }).monitor('MediaAssetType service: check if can leave section without saving');
    }

    public returnToAssetTypes(params: { force?: boolean } = {}) {
        this._router.navigate(['settings/metadataTemplates']);
    }

}
