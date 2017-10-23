import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from "../media-assets-types.service";

@Pipe({ name: 'kPrimeTableSortDirection' })
export class PrimeTableSortDirectionPipe implements PipeTransform {
  transform(value: SortDirection): number {
    switch (value) {
      case SortDirection.Asc:
        return 1;
      case SortDirection.Desc:
        return -1;
    }
  }
}
