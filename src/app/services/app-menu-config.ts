
export declare type AppMenuConfig = AppMenuItem[];
export interface AppMenuItem {
    routePath?: string;
    titleToken : string;
    children?: AppMenuItem[];
    position?: string;
}
export function validateConfig(config: AppMenuConfig): void {
    // todo [tvm-ng]: check config validity
}
