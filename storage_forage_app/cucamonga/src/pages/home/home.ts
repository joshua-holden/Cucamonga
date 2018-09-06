import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import {LoginPage} from '../login/login';
import{AccountPage} from '../account/account';
import {BrowsetabPage} from '../browsetab/browsetab';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private login : FormGroup;
  private submitAttempt;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
    this.login = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  })
  }

  // submitForm(){
  // // this.navCtrl.push(BrowsetabPage);
  //  this.submitAttempt = true;
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
