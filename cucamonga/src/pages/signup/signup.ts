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
  private submitAttempt;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
  	this.signup = this.formbuilder.group({
      username:['',Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      birthday:['',Validators.required],
  		email: ['', Validators.required],
  		password: ['', Validators.required],
      passwordconfirm: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'passwordconfirm')}); 

  }
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
        return (group: FormGroup): {[key: string]: any} => {
          let password = group.controls[passwordKey];
          let passwordconfirm = group.controls[confirmPasswordKey];
    
          if (password.value !== passwordconfirm.value) {
            return {
              mismatchedPasswords: true
            };
          }
        }
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
