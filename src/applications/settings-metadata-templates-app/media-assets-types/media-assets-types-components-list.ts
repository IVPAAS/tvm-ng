import { IsProtectedPipe } from './pipes/is-protected.pipe';
import { MediaAssetsTypesTableComponent } from './media-assets-types-table.component';
import { MediaAssetsTypesListComponent } from './media-assets-types-list.component';
import { PrimeTableSortDirectionPipe } from './pipes/prime-table-sort-direction.pipe';

export const MediaAssetsTypesComponentsList = [
    MediaAssetsTypesListComponent,
    MediaAssetsTypesTableComponent,
    PrimeTableSortDirectionPipe,
    IsProtectedPipe
];
