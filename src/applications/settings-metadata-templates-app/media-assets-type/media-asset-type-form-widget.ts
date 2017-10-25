
import { KalturaMultiRequest } from 'kaltura-ott-typescript-client';
import { KalturaAssetStructListResponse } from 'kaltura-ott-typescript-client/types/KalturaAssetStructListResponse';
import { Injectable } from '@angular/core';
import { FormWidget } from '@kaltura-ng/kaltura-ui';
import '@kaltura-ng/kaltura-common/rxjs/add/operators';
import { AreaBlockerMessage, AreaBlockerMessageButton } from '@kaltura-ng/kaltura-ui';
import { AssetTypeFormManager } from './media-asset-type-form-manager';

@Injectable()
export abstract class MediaAssetTypeFormWidget extends FormWidget<KalturaAssetStructListResponse, KalturaMultiRequest> {
    public sectionBlockerMessage: AreaBlockerMessage;
    public showSectionLoader: boolean;

    constructor(private _widgetKey: string) {
        super(_widgetKey);
    }

    protected _showLoader() {
        this._removeBlockerMessage();
        this.showSectionLoader = true;
    }

    protected _hideLoader() {
        this.showSectionLoader = false;
    }

    protected _removeBlockerMessage(): void {
        this.sectionBlockerMessage = null;
    }

    protected _showBlockerMessage(message: AreaBlockerMessage, addBackButton: boolean) {
        let messageToShow = message;
        if (addBackButton) {
            messageToShow = new AreaBlockerMessage({
                message: message.message,
                buttons: [
                    ...this._createBackButton(),
                    ...message.buttons
                ]
            })
        }
        ;

        this.showSectionLoader = false;
        this.sectionBlockerMessage = messageToShow;
    }

    protected _createBackButton(): AreaBlockerMessageButton[] {
        if (this._manager instanceof AssetTypeFormManager) {
            return [{
                label: 'Back To asset types',
                action: () => {
                    (<AssetTypeFormManager>this._manager).returnToAssetTypes();
                }
            }];
        } else {
            return [];
        }

    }

    protected _showActivationError() {
        this._showBlockerMessage(new AreaBlockerMessage(
            {
                message: 'An error occurred while loading data',
                buttons: [
                    {
                        label: 'Retry',
                        action: () => {
                            this.activate();
                        }
                    }
                ]
            }
        ), true);
    }
}
