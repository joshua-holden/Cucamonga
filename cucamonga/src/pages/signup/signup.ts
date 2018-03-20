import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder: FormBuilder) {
  	this.signup = this.formbuilder.group({
  		firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  		lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  		email: ['', Validators.required],
  		password: ['', Validators.required],
  		passwordconfirm: ['', Validators.required],
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
/* Some validation functionality*/
  submitForm() {
  	this.submitAttempt = true;
  	console.log(this.signup.value);
  }
}
