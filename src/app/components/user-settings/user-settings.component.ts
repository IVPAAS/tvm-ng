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
	public _languages = [];
	public _selectedLanguage = "English";

	constructor(private userAuthentication: AppAuthentication, private appNavigator: AppNavigator, private browserService: BrowserService) {
		this._userContext = userAuthentication.appUser;

		environment.core.locales.forEach(locale => {
			this._languages.push({ label: locale.label, value: locale.id });
		});

		const currentLang = this.browserService.getFromLocalStorage('tvm_lang');
		if (currentLang && currentLang.length) {
			const lang = this._languages.find((lang) => { return lang.value === currentLang });
			if (lang) {
				this._selectedLanguage = lang.value;
			}
		}
	}

	logout() {
		this.userAuthentication.logout();
		//this.appNavigator.navigateToLogout();
		document.location.reload();
	}

	onLangSelected(event) {
		this.browserService.setInLocalStorage('tvm_lang', event.value);
		location.reload();

		console.log("Change language to: " + event.value);
	}

}
