import { NgModule,SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CheckboxModule, SharedModule } from 'primeng/primeng';

import { AppShellService } from "./providers/app-shell.service";
import { BrowserService } from "./providers/browser.service";

@NgModule({
    imports: <any[]>[
        CommonModule,
        FormsModule,
        CheckboxModule,
        SharedModule
    ],
    declarations: <any[]>[

    ],
    exports: <any[]>[

    ],
    providers: <any[]>[
    ]
})
export class KMCShellModule {
    // constructor(@Optional() @SkipSelf() module : KMCShellModule, private appBootstrap : AppBootstrap)
    // {
    //     if (module) {
    //         throw new Error("KMCShellModule module imported twice.");
    //     }
    // }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: KMCShellModule,
            providers: <any[]>[
                BrowserService,
                AppShellService
            ]
        };
    }
}
