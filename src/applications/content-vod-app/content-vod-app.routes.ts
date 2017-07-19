import { Route }        from '@angular/router';

import { ContentAssetsComponent } from './content-vod.component';
import { AssetsListComponent } from './assets/assets-list.component';

export const routing: Route[] = [
	{path: '', component: ContentAssetsComponent,
		children:[
			{path: '', redirectTo: 'list', pathMatch: 'full'},
			{path: 'list', component: AssetsListComponent}
	]},

];
