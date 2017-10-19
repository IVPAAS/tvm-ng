import { AssetTypeAvailabilityComponent } from './media-assets-type/asset-type-availability/asset-type-availability.component';
import { AssetTypeImagesComponent } from './media-assets-type/asset-type-images/asset-type-images.component';
import { AssetTypePlaybackComponent } from './media-assets-type/asset-type-playback/asset-type-playback.component';
import { AssetTypeWidgetKeys } from './media-assets-type/media-asset-type-widget-keys';
import { AssetTypeMetadataComponent } from './media-assets-type/asset-type-metadata/asset-type-metadata.component';
import { MediaAssetsTypesListComponent } from './media-assets-types/media-assets-types-list.component';
import { Route } from '@angular/router';
import { SettingsMetadataTemplatesComponent } from './settings-metadata-templates.component';
import { MediaAssetsTypeComponent } from 'applications/settings-metadata-templates-app/media-assets-type/media-assets-type.component';

export const routing: Route[] = [
  {
    path: '', component: SettingsMetadataTemplatesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MediaAssetsTypesListComponent },
      {
        path: 'mediaAssetsType/:id', component: MediaAssetsTypeComponent,
        data: {
          mediaTypeRoute: true
        },
        children: [
          { path: '', redirectTo: 'metadata', pathMatch: 'full' },
          { path: 'metadata', component: AssetTypeMetadataComponent, data: { sectionKey: AssetTypeWidgetKeys.Metadata } },
          { path: 'playback', component: AssetTypePlaybackComponent, data: { sectionKey: AssetTypeWidgetKeys.Playback } },
          { path: 'images', component: AssetTypeImagesComponent, data: { sectionKey: AssetTypeWidgetKeys.Images } },
          { path: 'availability', component: AssetTypeAvailabilityComponent, data: { sectionKey: AssetTypeWidgetKeys.Availability } },
        ]
      }
    ]
  }
];
