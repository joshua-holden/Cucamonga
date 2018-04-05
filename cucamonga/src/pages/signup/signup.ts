import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

/**
 * class for the SignupPage page.
 *
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signup : FormGroup;
  private submitAttempt;

  @ViewChild('bdate') bdate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public alrtCtrl: AlertController) {
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
    let age = moment().diff(this.bdate.value, 'year', true);

    if(age != 0 && age < 18){
        let alert = this.alrtCtrl.create({
	    title: "I'm sorry...",
	    subTitle: 'birth date was not at least 18 years ago',
	    buttons: ['OK']
	    });
	    alert.present();
	}
  	this.submitAttempt = true;
  	console.log(this.signup.value);
  }
}
