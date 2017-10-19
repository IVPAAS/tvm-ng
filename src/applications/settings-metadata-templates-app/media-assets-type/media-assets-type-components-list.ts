import { AssetTypePreviewComponent } from './asset-type-preview/asset-type-preview.component';
import { AssetTypeSectionsListComponent } from './asset-type-section-list/asset-type-sections-list.component';
import { AssetTypeImagesComponent } from './asset-type-images/asset-type-images.component';
import { AssetTypeAvailabilityComponent } from './asset-type-availability/asset-type-availability.component';
import { AssetTypePlaybackComponent } from './asset-type-playback/asset-type-playback.component';
import { AssetTypeMetadataComponent } from './asset-type-metadata/asset-type-metadata.component';
import { MediaAssetsTypeComponent } from 'applications/settings-metadata-templates-app/media-assets-type/media-assets-type.component';

export const MediaAssetsTypeComponentsList = [
    MediaAssetsTypeComponent,
    AssetTypeMetadataComponent,
    AssetTypePlaybackComponent,
    AssetTypeImagesComponent,
    AssetTypeAvailabilityComponent,
    AssetTypeSectionsListComponent,
    AssetTypePreviewComponent
];
