import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { MediaAssetType } from "applications/settings-metadata-templates-app/media-assets-types/media-assets-types.service";

@Pipe({name: 'mediaAssetType'})
export class MediaAssetTypePipe implements PipeTransform {

	constructor(private appLocalization: AppLocalization) {
	}

	transform(value, isTooltip: boolean): string {
		let className = "";
		let tooltip = "";
		if (typeof(value) !== 'undefined' && value !== null) {
			switch (value) {
				case MediaAssetType.Movie:
					className = 'kIconvideo';
					tooltip = this.appLocalization.get("applications.settings.mediaAssetType.movie");
					break;
				case MediaAssetType.Episodes:
					tooltip = this.appLocalization.get("applications.settings.mediaAssetType.episodes");
					className = 'kIconimage';
					break;
				case MediaAssetType.Series:
					tooltip = this.appLocalization.get("applications.settings.mediaAssetType.series");
					className = 'kIconsound';
					break;				
				default:
					break;
			}
		}
		if (isTooltip) {
			return tooltip;
		} else {
			return className;
		}
	}
}
