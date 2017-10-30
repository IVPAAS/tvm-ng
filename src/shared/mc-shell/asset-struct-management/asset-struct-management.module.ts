import { ModuleWithProviders, NgModule } from '@angular/core';
import { AssetStructManagement } from './asset-struct-management.service';

@NgModule({
  imports: <any[]>[
    
  ],
  declarations: <any[]>[],
  exports: <any[]>[],
  providers: <any[]>[]
})
export class AssetStructManagementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AssetStructManagementModule,
      providers: <any[]>[
        AssetStructManagement
      ]
    };
  }
}
