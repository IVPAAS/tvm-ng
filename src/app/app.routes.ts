import { Routes, RouterModule } from '@angular/router';
import { AuthCanActivate, AppBootstrap } from 'app-shared/mc-shell';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from "./components/error/error.component";


const routes: Routes = <Routes>[
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: '', canActivate: [AppBootstrap],
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: '', component: DashboardComponent, canActivate: [AuthCanActivate], children: [
          {
            path: 'content', children: [
              { path: '', redirectTo: 'assets', pathMatch: 'full' },
              { path: 'assets', loadChildren: '../applications/content-vod-app/content-vod-app.module#ContentVODAppModule' }
            ]
          },
          {
            path: 'settings', children: [
              { path: '', redirectTo: 'metadataTemplates', pathMatch: 'full' },
              {
                path: 'metadataTemplates',
                loadChildren: '../applications/settings-metadata-templates-app/settings-metadata-templates-app.module#SettingsMetadataTemplatesAppModule'
              }
            ]
          },
        ]
      },
      {
        path: '**', redirectTo: '/login', pathMatch: 'full'
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes);


