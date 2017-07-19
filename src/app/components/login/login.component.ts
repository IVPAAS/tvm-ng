import { Component, OnInit } from '@angular/core';
import { environment } from 'app-environment';

import { AppAuthentication, AppNavigator } from 'app-shared/mc-shell';
import { BrowserService } from 'app-shared/mc-shell';

@Component({
  selector: 'kKMCLogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage : string;
  inProgress = false;
  showLogin = false;

  constructor(private appAuthentication : AppAuthentication, private appNavigator: AppNavigator, private browserService: BrowserService) {

  }

  ngOnInit() {
    if (this.appAuthentication.isLogged()){
      this.appNavigator.navigateToDefault();
    }else{
      this.showLogin = true;
    }
  }

  login(partnerId, username, password ,event) {

    event.preventDefault();

    this.errorMessage = '';

    if (partnerId && username && password) {
      this.inProgress = true;


      this.appAuthentication.login(partnerId, username, password).subscribe(
          (result) => {
            this.appNavigator.navigateToDefault();
            this.inProgress = false;
          },
          (err) => {
            this.errorMessage = 'invalid credentials, please try again';
            console.log(err.message);
            this.inProgress = false;
          }
      );
    }else
    {
      this.errorMessage = 'all fields are manadatory';
    }
  }
}
