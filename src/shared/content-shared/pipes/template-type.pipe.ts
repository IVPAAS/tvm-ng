import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { TemplateType } from "applications/settings-metadata-templates-app/media-assets-types/media-assets-types.service";

@Pipe({ name: 'templateType' })
export class TemplateTypePipe implements PipeTransform {

	constructor(private appLocalization: AppLocalization) {
	}

	transform(value, isTooltip: boolean): string {
		let ret = "";
		let tooltip = "";
		if (typeof (value) !== 'undefined' && value !== null) {
			switch (value) {
				case TemplateType.MediaAssets:
					ret = this.appLocalization.get("applications.settings.templateType.mediaAssets");;
					tooltip = this.appLocalization.get("applications.settings.templateType.mediaAssets");
					break;
				default:
					break;
			}
		}
		if (isTooltip) {
			return tooltip;
		} else {
			return ret;
		}
	}
}
