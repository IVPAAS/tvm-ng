import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { DataTable } from 'primeng/primeng';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
// import { CategoriesService } from "./categories.service";


@Component({
    selector: 'kMediaAssetsType',
    templateUrl: './media-assets-type.component.html',
    styleUrls: ['./media-assets-type.component.scss']
})
export class MediaAssetsTypeComponent {
}
