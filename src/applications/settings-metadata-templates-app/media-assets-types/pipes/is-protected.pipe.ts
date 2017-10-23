import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kaltura-ng/kaltura-common';

@Pipe({ name: 'kIsProtected' })
export class IsProtectedPipe implements PipeTransform {

    constructor(private appLocalization: AppLocalization) {
    }

    transform(value: boolean): string {
        if (value) {
            return this.appLocalization.get("applications.settings.isProtected.basic");
        }
        else {
            return "";
        }
    }
}
