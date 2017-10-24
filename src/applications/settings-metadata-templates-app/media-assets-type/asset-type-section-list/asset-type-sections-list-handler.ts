import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AssetTypeSectionsList } from './asset-type-sections-list';
import { AssetTypeWidgetKeys } from '../media-asset-type-widget-keys';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';
import { MediaAssetTypeFormWidget } from '../media-asset-type-form-widget';
import { KalturaMetaListResponse } from 'kaltura-ott-typescript-client/types/KalturaMetaListResponse';


export interface SectionWidgetItem {
    label: string,
    isValid: boolean,
    attached: boolean,
    key: string
}

@Injectable()
export class AssetTypeSectionsListHandler extends MediaAssetTypeFormWidget {
    private _sectionsBehaviourSubject = new BehaviorSubject<SectionWidgetItem[]>([]);
    public sectionsObservable$: Observable<SectionWidgetItem[]> = this._sectionsBehaviourSubject.asObservable();

    constructor(private _appLocalization: AppLocalization) {
        super('assetTypeSectionsList');
    }

    protected _onDataLoading(dataId: any): void {
        this._clearSectionsList();
    }

    protected _onActivate(firstTimeActivating: boolean) {
        if (firstTimeActivating) {
            this._initialize();
        }
    }

    protected _onDataLoaded(data: KalturaMetaListResponse): void {
        this._reloadSections(data);
    }

    private _initialize(): void {
        this._manager.widgetsState$
            .cancelOnDestroy(this)
            .subscribe(
            sectionsState => {
                this._sectionsBehaviourSubject.getValue().forEach((section: SectionWidgetItem) => {
                    const sectionState = sectionsState[section.key];
                    const isValid = (!sectionState || sectionState.isBusy || sectionState.isValid || !sectionState.isActive);
                    const isAttached = (!!sectionState && sectionState.isAttached);

                    if (section.attached !== isAttached || section.isValid !== isValid) {
                        console.log(`sections list: updated section '${section.key}' state`, {
                            isAttached,
                            isValid
                        });
                        section.attached = isAttached;
                        section.isValid = isValid;
                    }
                });
            }
            );
    }

    /**
     * Do some cleanups if needed once the section is removed
     */
    protected _onReset() {

    }

    private _clearSectionsList(): void {
        this._sectionsBehaviourSubject.next([]);

    }

    private _reloadSections(metaList: KalturaMetaListResponse): void {
        const sections = [];
        const formWidgetsState = this._manager.widgetsState;

        if (metaList) {
            AssetTypeSectionsList.forEach((section) => {

                const sectionFormWidgetState = formWidgetsState ? formWidgetsState[section.key] : null;
                const isSectionActive = sectionFormWidgetState && sectionFormWidgetState.isActive;

                if (this._isSectionEnabled(section.key, metaList)) {
                    sections.push(
                        {
                            label: this._appLocalization.get(section.label),
                            active: isSectionActive,
                            hasErrors: sectionFormWidgetState ? sectionFormWidgetState.isValid : false,
                            key: section.key
                        }
                    );
                }
            });
        }

        this._sectionsBehaviourSubject.next(sections);
    }

    private _isSectionEnabled(sectionKey: string, metaList: KalturaMetaListResponse): boolean {
        // const mediaType = this.data.mediaType;
        // const externalMedia = this.data instanceof KalturaExternalMediaEntry;
        // switch (sectionKey) {
        //     case EntryWidgetKeys.Thumbnails:
        //         return mediaType !== KalturaMediaType.image;
        //     case EntryWidgetKeys.Flavours:
        //         return mediaType !== KalturaMediaType.image && !this._isLive(entry) && !externalMedia;
        //     case EntryWidgetKeys.Captions:
        //         return mediaType !== KalturaMediaType.image && !this._isLive(entry) && !externalMedia;
        //     case EntryWidgetKeys.Live:
        //         return this._isLive(entry);
        //     case EntryWidgetKeys.Clips:
        //         return mediaType !== KalturaMediaType.image && !externalMedia;
        //     default:
        //         return true;
        // }
        return true;
    }
}
