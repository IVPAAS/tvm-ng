import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
    name: 'kUtcDate'
})
export class UtcDatePipe implements PipeTransform {

    constructor() { }

    transform(date: number, format: string): any {
        if (date) {
            if (!format) {
                format = "L";
            }

            return moment(date * 1000).format(format);
        } else {
            return '';
        }
    }
}
