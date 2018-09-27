import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BrowsetabPage } from '../browsetab/browsetab';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  private login: FormGroup;
  private submitAttempt: boolean = false;
  private failedLoginMessage: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private fireAuth: AngularFireAuth,
      public formbuilder: FormBuilder) {
    this.login = this.formbuilder.group({
        email: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
  		password: ['', Validators.required],
    })
  }

  openSignup() {
    this.navCtrl.push(SignupPage);
  }

  openDashboard() {
      this.fireAuth.auth.signInWithEmailAndPassword(this.login.value.email, this.login.value.password)
          .then(data => {
              this.navCtrl.push(BrowsetabPage);
          })
          .catch(err => {
              this.submitAttempt = true;
              this.failedLoginMessage = `${err.code.toUpperCase()}: ${err.message}`;
          });
  }
}

