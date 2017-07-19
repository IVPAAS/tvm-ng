import { Component } from '@angular/core';
import { BrowserService } from 'app-shared/mc-shell';
import { AppAuthentication, AppUser, PartnerPackageTypes, AppNavigator } from 'app-shared/mc-shell';
import { environment } from 'app-environment';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'kKMCUserSettings',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
	timeoutID: number = null;
	public _userContext: AppUser;
	public _languages = [{label: "English", value: "en"}, {label: "Deutsch", value: "de"}, {label: "Español", value: "es"}, {label: "Français", value: "fr"}, {label: "日本語", value: "lp"}];
	public _selectedLanguage = "English";

	constructor(private userAuthentication: AppAuthentication, private appNavigator: AppNavigator, private browserService: BrowserService) {
		this._userContext = userAuthentication.appUser;
	}

	logout() {
		this.userAuthentication.logout();
		//this.appNavigator.navigateToLogout();
		document.location.reload();
	}

	onLangSelected(event){
		console.log("Change language to: " + event.value);
	}

}
