import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {LoginPage} from '../login/login';
import {BrowsetabPage} from '../browsetab/browsetab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openSignup() {
  	this.navCtrl.push(SignupPage);
  }
  openLogin() {
  	this.navCtrl.push(LoginPage);
  }

  openDashboard() {
    this.navCtrl.push(BrowsetabPage);
  }
}
