import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import * as R from 'ramda';
import { KalturaClient } from '@kaltura-ng/kaltura-ott-client';

import { AppUser } from "./app-user";
import { AppStorage } from "@kaltura-ng/kaltura-common";
import { PartnerInfo } from "./partner-info";
import { OttUserLoginAction } from 'kaltura-ott-typescript-client/types/OttUserLoginAction';
import { OttUserGetAction } from 'kaltura-ott-typescript-client/types/OttUserGetAction';


export enum AppAuthStatusTypes {
    UserLoggedIn,
    UserLoggedOut
}

@Injectable()
export class AppAuthentication {

    private _appUser : AppUser;
    private _appAuthStatus = new BehaviorSubject<AppAuthStatusTypes>(AppAuthStatusTypes.UserLoggedOut);

    appEvents$ = this._appAuthStatus.asObservable();

    defaultRoutes = {
        loginRoute: "",
        defaultRoute: "",
        errorRoute: ""
    }

    constructor(
        private _kalturaClient : KalturaClient,
        private appStorage : AppStorage
    ) {
        this._appUser = new AppUser();
    }

    get currentAppEvent() : AppAuthStatusTypes{
        return this._appAuthStatus.getValue();
    }

    get appUser() : AppUser{
        return this._appUser;
    }

    login(partnerId : number,loginId : string, password : string) : Observable<boolean> {
        return this._kalturaClient.request(new OttUserLoginAction({
            partnerId,
            username : loginId,
            password
        })).do(
            response =>
            {
                this.appUser.partnerId = partnerId;
                this.appUser.firstName = response.user.firstName;
                this.appUser.lastName = response.user.lastName;
                this.appUser.fullName = `${this.appUser.firstName} ${this.appUser.lastName}`;
                const ks = response.loginSession.ks;
                this._kalturaClient.ks = ks ;

                // TODO [tvmng] in the future should not persist the partner id, temporary workaround
                this.appStorage.setInSessionStorage('auth.login.ks',`${partnerId},${ks}`);

                this._appAuthStatus.next(AppAuthStatusTypes.UserLoggedIn);
            }
        ).map(
            response =>
            {
                return true;
            }
        );

    }

    isLogged(){
        return this._appAuthStatus.getValue() === AppAuthStatusTypes.UserLoggedIn;
    }

    logout() {
        this._kalturaClient.ks = null;

        this.appStorage.removeFromSessionStorage('auth.login.ks');

        this._appAuthStatus.next(AppAuthStatusTypes.UserLoggedOut);
    }


    public loginAutomatically() : Observable<boolean>
    {
        return Observable.create((observer : any) =>
        {
            if (this._appAuthStatus.getValue() === AppAuthStatusTypes.UserLoggedOut) {
                const loginToken = this.appStorage.getFromSessionStorage('auth.login.ks');  // get ks from session storage
                if (loginToken) {

                    const [ partnerId,ks ] = loginToken.split(',');

                    this._kalturaClient.request(new OttUserGetAction(
                        {
                            ks : ks
                        }
                    ))
                        .subscribe(
                            response =>
                            {
                                this.appUser.partnerId = partnerId*1;
                                this.appUser.firstName = response.firstName;
                                this.appUser.lastName = response.lastName;
                                this.appUser.fullName = `${this.appUser.firstName} ${this.appUser.lastName}`;

                                this._kalturaClient.ks = ks;
                                observer.next(true);
                                observer.complete();
                                this._appAuthStatus.next(AppAuthStatusTypes.UserLoggedIn);
                            },
                            reason =>
                            {
                                observer.next(false);
                                observer.complete();
                                this._appAuthStatus.next(AppAuthStatusTypes.UserLoggedOut);
                            }
                        )
                }else {
                    observer.next(false);
                    observer.complete();
                    this._appAuthStatus.next(AppAuthStatusTypes.UserLoggedOut);
                }
            }
        });
    }
}
