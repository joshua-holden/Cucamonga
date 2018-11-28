import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BrowsetabPage } from '../browsetab/browsetab';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signup : FormGroup;
  private submitAttempt: boolean = false;
  private failedSubmitMessage: string;
  private myPhoto: string;

  @ViewChild('bdate') bdate;

    /**
     * @constructor
     */
  constructor(private fireAuth: AngularFireAuth,
      public dbProvider: AngularfireDbProvider,
      public navCtrl: NavController,
      public formbuilder: FormBuilder,
      private camera: Camera,
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

    /**
     * Checks if two passwords match and sets the password match form control.
     * @param passwordKey
     * @param confirmPasswordKey
     */
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

    /**
     * Checks the birthdate is at least 18 years ago for the form controller.
     * @param birthday
     */
  validateAge(birthday: string) {
      return (group: FormGroup): { [key: string]: any } => {
          let bdate = group.controls[birthday];
          let age = moment().diff(bdate.value, 'year', true);
          if (age != 0 && age < 18) {
              return {
                  validateAge: true,
              };
          }
      }
  }

    /**
     *Submits the form data to create a new account in the database.
     */
  submitForm() {
      if (this.signup.valid && !this.signup.hasError('validateAge') && this.myPhoto) {
          this.fireAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password)
              .then(data => {
                  this.fireAuth.auth.signInWithEmailAndPassword(this.signup.value.email, this.signup.value.password);
                  let account: Account = {
                      userID: data.user.uid,
                      firstName: this.signup.value.firstname,
                      lastName: this.signup.value.lastname,
                      email: this.signup.value.email,
                      birthDate: this.signup.value.birthday,
                      profileImg: this.myPhoto,
                      posts: [],
                      requests: [],
                  };
                  this.dbProvider.addAccount(account);
                  this.navCtrl.push(BrowsetabPage);
              })
              .catch(err => {
                  console.log(err);
                  this.submitAttempt = true;
                  this.failedSubmitMessage = `${err.code.toUpperCase()}: ${err.message}`;
              });
      }
      else {
          this.submitAttempt = true;
      }
  }
    /**
     * Retrieves pictures from the user's mobile device.
     */
  getPictures() {
      const options: CameraOptions = {
          quality: 70,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: this.camera.EncodingType.JPEG,
          saveToPhotoAlbum: false,
          allowEdit: true,
          targetWidth: 300,
          targetHeight: 300,
      };
      this.camera.getPicture(options).then(imgData => {
          this.myPhoto = 'data:image/jpeg;base64,' + imgData;
      }).catch(err => {
          console.log(err);
      });
  }
}
