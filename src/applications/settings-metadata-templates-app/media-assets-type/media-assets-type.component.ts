import { AssetTypeSectionsListHandler } from './asset-type-section-list/asset-type-sections-list-handler';
import { AssetTypeFormManager } from './media-asset-type-form-manager';
import { MediaAssetTypeService } from './media-asset-type.service';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { DataTable } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { MediaAssetTypeFormWidget } from 'applications/settings-metadata-templates-app/media-assets-type/media-asset-type-form-widget';
// import { CategoriesService } from "./categories.service";


@Component({
    selector: 'kMediaAssetsType',
    templateUrl: './media-assets-type.component.html',
    styleUrls: ['./media-assets-type.component.scss'],
    providers: [
        MediaAssetTypeService,
        AssetTypeFormManager,
        {
            provide: MediaAssetTypeFormWidget,
            useClass: AssetTypeSectionsListHandler,
            multi: true
        }
    ]
})
export class MediaAssetsTypeComponent {
}
