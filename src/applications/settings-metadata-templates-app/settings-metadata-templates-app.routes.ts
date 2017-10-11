import { MediaAssetsTypesListComponent } from './media-assets-types/media-assets-types-list.component';
import { Route } from '@angular/router';
import { SettingsMetadataTemplatesComponent } from './settings-metadata-templates.component';
import { MediaAssetsTypeComponent } from "applications/settings-metadata-templates-app/media-assets-type/media-assets-type.component";

export const routing: Route[] = [
  {
    path: '', component: SettingsMetadataTemplatesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MediaAssetsTypesListComponent },
      {
        path: 'mediaAssetsType/:id', component: MediaAssetsTypeComponent,
        data: {
          categoryRoute: true
        }
      }
    ]
  }
];
