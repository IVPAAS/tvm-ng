import { ModuleWithProviders, NgModule } from '@angular/core';
import { MetaManagement } from './meta-management.service';

@NgModule({
  imports: <any[]>[
    
  ],
  declarations: <any[]>[],
  exports: <any[]>[],
  providers: <any[]>[]
})
export class MetaManagementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MetaManagementModule,
      providers: <any[]>[
        MetaManagement
      ]
    };
  }
}
