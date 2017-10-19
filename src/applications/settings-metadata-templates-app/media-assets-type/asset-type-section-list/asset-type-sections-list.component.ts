import { AssetTypeService } from './../media-asset-type.service';
import { AssetTypeFormManager } from './../media-asset-type-form-manager';
import { SectionWidgetItem, AssetTypeSectionsListHandler } from './asset-type-sections-list-handler';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'k-asset-type-sections-list',
  templateUrl: './asset-type-sections-list.component.html',
  styleUrls: ['./asset-type-sections-list.component.scss']
})
export class AssetTypeSectionsListComponent implements AfterViewInit, OnInit, OnDestroy {

  public _loading = false;
  public _showList = false;
  public _sections: SectionWidgetItem[] = [];
  private _handler: AssetTypeSectionsListHandler;

  constructor(private _formManager: AssetTypeFormManager, public _assetTypeService: AssetTypeService) {
  }

  public navigateToSection(widget: SectionWidgetItem): void {
    this._assetTypeService.openSection(widget.key);
  }

  ngOnInit() {
    this._loading = true;
    this._handler = this._formManager.attachWidget(AssetTypeSectionsListHandler);

    this._handler.sectionsObservable$
      .cancelOnDestroy(this)
      .subscribe(
      sections => {
        this._loading = false;
        this._sections = sections;
        this._showList = sections && sections.length > 0;
      }
      );
  }

  ngOnDestroy() {
    this._formManager.detachWidget(this._handler);
  }

  ngAfterViewInit() {
  }
}
