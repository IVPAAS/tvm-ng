import { MediaAssetsTypesListComponent } from './media-assets-types/media-assets-types-list.component';
import { Route } from '@angular/router';
import { SettingsMetadataTemplatesComponent } from './settings-metadata-templates.component';

export const routing: Route[] = [
  {
    path: '', component: SettingsMetadataTemplatesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MediaAssetsTypesListComponent }
    ]
  }
];
