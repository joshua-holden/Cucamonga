import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signup : FormGroup;
  private submitAttempt;

  @ViewChild('bdate') bdate;

  constructor(private fireAuth: AngularFireAuth,
      public navCtrl: NavController,
      public navParams: NavParams,
      public formbuilder: FormBuilder,
      public alrtCtrl: AlertController) {
  	this.signup = this.formbuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      birthday: ['', Validators.required],
  	  email: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
  	  password: ['', Validators.required],
      passwordconfirm: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'passwordconfirm')}); 

  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      
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

  validateAge(birthday: string) {
      return (group: FormGroup): { [key: string]: any } => {
          let bdate = group.controls[birthday];
          let age = moment().diff(bdate.value, 'year', true);
          if (age != 0 && age < 18) {
              return {
                  validateAge: true
              };
          }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  submitForm() {
    this.submitAttempt = true;
    if (this.signup.valid) {
        this.fireAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password);
    }
  }
}
