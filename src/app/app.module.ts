import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Ng2Webstorage } from 'ng2-webstorage';


import { BootstrapAdapterToken, AppBootstrap, AppBootstrapConfig  as AppBootstrapConfigType } from 'app-shared/mc-shell';
import { KalturaCommonModule, AppStorage } from '@kaltura-ng/kaltura-common';
import { AreaBlockerModule } from '@kaltura-ng/kaltura-ui';
import { KalturaClient, KalturaClientConfiguration } from '@kaltura-ng/kaltura-ott-client';
import { PopupWidgetModule } from '@kaltura-ng/kaltura-ui/popup-widget';

import { BrowserService, KMCShellModule } from 'app-shared/mc-shell';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { KalturaAuthConfigAdapter } from './services/kaltura-auth-config-adapter.service';
import { AppDefaultConfig } from "./services/app-default-config.service";

import { AppMenuService } from './services/app-menu.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';

import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


import { ButtonModule, InputTextModule, TieredMenuModule } from 'primeng/primeng';

import { AppLocalization } from '@kaltura-ng/kaltura-common';
import { UploadManagementModule } from '@kaltura-ng/kaltura-common/upload-management';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ConfirmDialogModule, ConfirmationService, DropdownModule } from 'primeng/primeng';
import { environment } from 'app-environment';
import { AuthModule } from 'app-shared/mc-shell';


export function clientConfigurationFactory()
{
  const result = new KalturaClientConfiguration();
  result.endpointUrl = environment.core.kaltura.apiUrl;
  result.clientTag = 'TVMng';
  return result;
}

@NgModule({
  imports: <any>[
    AuthModule ,
	FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
	DropdownModule,
    HttpModule,
    InputTextModule,
    Ng2PageScrollModule.forRoot(),
    KMCShellModule.forRoot(),
    KalturaCommonModule.forRoot(),
    Ng2Webstorage,
    PopupWidgetModule,
    routing,
    TieredMenuModule,
    UploadManagementModule,
    AreaBlockerModule
  ],
  declarations: <any>[
      AppComponent,
    DashboardComponent,
    AppMenuComponent,
    LoginComponent,
    ErrorComponent,
    UserSettingsComponent
  ],
  bootstrap: <any>[
      AppComponent
  ],
  exports: [ ],
  providers: <any>[
    AppMenuService,
    {
      provide : BootstrapAdapterToken,
      useClass : KalturaAuthConfigAdapter,
      multi : true
    },
    AppDefaultConfig,
    { provide : AppStorage,  useExisting : BrowserService },
    KalturaClient,
    {
      provide : KalturaClientConfiguration,
      useFactory : clientConfigurationFactory
    },
    ConfirmationService
  ]
})
export class AppModule {
  constructor(appBootstrap: AppBootstrap, appLocalization : AppLocalization, config: AppDefaultConfig){

    //appLocalization.supportedLocales = environment.core.locales;
    appBootstrap.initApp(<AppBootstrapConfigType>config);
  }
}
