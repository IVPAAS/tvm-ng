import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kaltura-ng/kaltura-common';

@Pipe({ name: 'kMediaAssetType' })
export class MediaAssetTypePipe implements PipeTransform {

	constructor(private appLocalization: AppLocalization) {
	}

	transform(value: string, isTooltip: boolean): string {
		let className = "";
		let tooltip = "";
		if (typeof (value) !== 'undefined' && value !== null) {
			switch (value) {
				case "Movie":
					className = 'kIconvideo';
					tooltip = this.appLocalization.get("applications.settings.mediaAssetType.movie");
					break;
				case "Episode":
					tooltip = this.appLocalization.get("applications.settings.mediaAssetType.episodes");
					className = 'kIconimage';
					break;
				case "Series":
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
