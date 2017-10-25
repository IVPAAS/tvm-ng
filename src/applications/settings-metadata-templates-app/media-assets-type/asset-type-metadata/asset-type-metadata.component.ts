
import { Component, AfterViewInit,OnInit, OnDestroy } from '@angular/core';
import { AssetTypeMetadataHandler } from "./asset-type-metadata-handler";
import { AppAuthentication } from "app-shared/mc-shell";
import { AppLocalization } from "@kaltura-ng/kaltura-common";
import { BrowserService } from 'app-shared/mc-shell';
import { AssetTypeFormManager } from "./../media-asset-type-form-manager";

@Component({
  selector: 'k-asset-type-metadata',
  templateUrl: './asset-type-metadata.component.html',
  styleUrls: ['./asset-type-metadata.component.scss']
})
export class AssetTypeMetadataComponent implements AfterViewInit, OnInit, OnDestroy {

  public _handler: AssetTypeMetadataHandler;

  constructor(private _assetTypeFormManager: AssetTypeFormManager, private _appLocalization: AppLocalization, private _browserService: BrowserService,
    private _appAuthentication: AppAuthentication) { }

  ngOnInit() {
    this._handler = this._assetTypeFormManager.attachWidget(AssetTypeMetadataHandler);
  }

  ngOnDestroy() {

    this._assetTypeFormManager.detachWidget(this._handler);
  }

  ngAfterViewInit() {

  }

}
