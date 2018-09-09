import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import {LoginPage} from '../login/login';
import{AccountPage} from '../account/account';
import {BrowsetabPage} from '../browsetab/browsetab';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private login : FormGroup;
  private submitAttempt;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, private http: HTTP) {
    this.login = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  })
  }

httpGet(){
this.http.get('http://ionic.io', {}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
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
