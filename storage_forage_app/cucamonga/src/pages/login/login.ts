import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {BrowsetabPage} from '../browsetab/browsetab';
import {SignupPage} from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  private login : FormGroup;
  private submitAttempt;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public formbuilder: FormBuilder) {
    this.login = this.formbuilder.group({
  		email: ['', Validators.required],
  		password: ['', Validators.required],
  })
  }

  // submitForm(){
  // //	this.navCtrl.push(BrowsetabPage);
  // 	this.submitAttempt = true;
  // }

  openSignup() {
    this.navCtrl.push(SignupPage);
  }

  openDashboard() {
    this.navCtrl.push(BrowsetabPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


submitForm() {
  
  this.submitAttempt = true;
  console.log(this.login.value);
}
}

