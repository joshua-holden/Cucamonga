import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
      username:['',Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      birthday:['',Validators.required],
  		email: ['', Validators.required],
  		password: ['', Validators.required],
      passwordconfirm: ['', Validators.required],
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
