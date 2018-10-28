import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Account } from '../../classes';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

    private account: Account;
    private editAccount: FormGroup;
    private selected: string;
    private accountChanged: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formbuilder: FormBuilder,
        public afa: AngularFireAuth,
        private camera: Camera,
        public afdb: AngularfireDbProvider) {
        this.editAccount = this.formbuilder.group({
            firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            birthday: ['', Validators.required],
            email: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
            password: ['', Validators.required],
            passwordconfirm: ['', Validators.required],
        }, { validator: this.matchingPasswords('password', 'passwordconfirm') }); 
        this.afa.authState.subscribe(auth => {
            if (auth != null) afdb.getAccount(auth.uid).subscribe(acc => {
                this.account = acc as Account;
            });
        });
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
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
                    validateAge: true,
                };
            }
        }
    }

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
            this.account.profileImg = 'data:image/jpeg;base64,' + imgData;
            this.accountChanged = true;
        }).catch(err => {
            console.log(err);
        });
    }

    setFirstName() {
        if (this.editAccount.value.firstname
            && this.editAccount.value.lastname !== this.account.lastName
            && this.editAccount.controls.firstname.valid)
            this.account.firstName = this.editAccount.value.firstname;
        this.selected = '';
        this.accountChanged = true;
    }

    setLastName() {
        if (this.editAccount.value.lastname
            && this.editAccount.value.lastname !== this.account.lastName
            && this.editAccount.controls.lastname.valid)
          this.account.lastName = this.editAccount.value.lastname;
        this.selected = '';
        this.accountChanged = true;
    }

    setEmail() {
        if (this.editAccount.value.email
            && this.editAccount.value.email !== this.account.email
            && this.editAccount.controls.email.valid)
          this.account.email = this.editAccount.value.email;
        this.selected = '';
        this.accountChanged = true;
    }

    setBirthday() {
        if (this.editAccount.controls.birthday.touched
            && this.editAccount.value.birthday !== this.account.birthDate
            && !this.editAccount.hasError('validateAge'))
            this.account.birthDate = this.editAccount.value.birthday;
        this.selected = '';
        this.accountChanged = true;
    }

    setPassword() {
        this.selected = '';
    }

    submitChanges() {
        if (this.accountChanged)
            this.afa.authState.subscribe(auth => {
                this.afdb.updateAccount(auth.uid, this.account);
            });
        this.navCtrl.pop();
    }

    deleteAccount() {
        //show delete account modal
    }
}
